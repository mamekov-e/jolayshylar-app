import datetime

import jwt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from Jolayshylar import static
from .models import *
from rest_framework.response import Response
from .serializers import *
from django.core.mail import EmailMessage, get_connection
from django.conf import settings


# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            return Response(
                {
                    "user": serializer.data,
                    "token": {'refresh': str(refresh), 'access': str(refresh.access_token)}
                }
            )
        else:
            data = serializer.errors
            return Response(data, status=400)

class RegisterEmail(APIView):
    def post(self, request):
        if request.method == "POST":
            with get_connection(
                    host=settings.EMAIL_HOST,
                    port=settings.EMAIL_PORT,
                    username=settings.EMAIL_HOST_USER,
                    password=settings.EMAIL_HOST_PASSWORD,
                    use_tls=settings.EMAIL_USE_TLS
            ) as connection:
                subject = "Заявка на подключение услуг Jolayshylar"
                email_from = settings.EMAIL_HOST_USER
                recipient_list = "201145@astanait.edu.kz"
                city = request.POST.get("city")
                company = request.POST.get("company")
                email = request.POST.get("email")
                contacts = request.POST.get("contacts")
                message = "Что-то про приветствие. Мы компания пассажироперевозок - " + company \
                          + " - оперируем на территории " + city \
                          + ". Наш email: " + email \
                          + ". Кроме того, вы можете связаться с нами, используя следующие контактные данные: " \
                          + contacts
                EmailMessage(subject, message, email_from, recipient_list, connection=connection).send()

        return Response({
            'success': 'True'
        })


class LoginView(APIView):
    def post(self, request):
        login = request.data['login']
        password = request.data['password']

        user = User.objects.filter(login=login).first()

        refresh = RefreshToken.for_user(user)
        serializer = UserSerializer(user)

        if user is None:
            raise AuthenticationFailed('User was not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        return Response({
            'user': serializer.data,
            'token': {'refresh': str(refresh),
                      'access': str(refresh.access_token)}
            #company_id
        })


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message" : 'success'
        }

        return response


class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer

#send email

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_user(request):
    user_id = request.query_params['id']
    user = User.objects.get(id__exact=user_id)
    data = UserSerializer(user)
    return Response(data.data)


@permission_classes([IsAuthenticated])
class CompanyView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serialData = serializer.save()
            serializer = CompanySerializer(serialData)
            return Response(
                {"company": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_company(request):
    company_id = request.query_params['id']
    company = Company.objects.filter(id__exact=company_id).first()
    data = CompanySerializer(company)
    return Response(data.data)

@permission_classes([IsAuthenticated])
class CityView(APIView):
    def post(self, request):
        serializer = CitySerializer(data=request.data)
        if serializer.is_valid():
            serialData = serializer.save()
            serializer = CitySerializer(serialData)
            return Response(
                {"city": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_city(request):
    city_id = request.query_params['id']
    city = City.objects.filter(id__exact=city_id).first()
    data = CitySerializer(city)
    return Response(data.data)

@permission_classes([IsAuthenticated])
class Companies_citiesView(APIView):
    def post(self, request):
        serializer = Companies_citiesSerializer(data=request.data)
        if serializer.is_valid():
            serialData = serializer.save()
            serializer = Companies_citiesSerializer(serialData)
            return Response(
                {"companies_cities": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_companies_cities_by_company(request):
    company_id = request.query_params['id']
    cities = companies_cities.objects.filter(company_id__exact=company_id)
    data = Companies_citiesSerializer(cities, many=True)
    return Response(data.data)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_companies_cities_by_city(request):
    city_id = request.query_params['id']
    companies = companies_cities.objects.filter(city_id__exact=city_id)
    data = Companies_citiesSerializer(companies, many=True)
    return Response(data.data)


# def getUserByToken(request):
#     token = request.headers['Authorization'].split(' ')[1]
#     access_token_obj = AccessToken(token)
#
#     user_id = access_token_obj['user_id']
#     if User.objects.filter(id__exact=user_id).count() > 0:
#         user = User.objects.filter(id__exact=user_id).first()
#     else:
#         user = "Unknown User"
#     return user
