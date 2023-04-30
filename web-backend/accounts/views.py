from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .models import User, Company, City, companies_cities
from rest_framework.response import Response
from .serializers import MyTokenRefreshSerializer, CompanyPOSTSerializer, CompanyGETSerializer, CitySerializer, \
    RoleSerializer, UserPOSTSerializer, UserGETSerializer, Companies_citiesGETSerializer, \
    Companies_citiesPOSTSerializer
from django.core.mail import EmailMessage, get_connection
from django.conf import settings
from Jolayshylar.static import HTTPMethod


# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserPOSTSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            serializer = UserPOSTSerializer(user)
            user.is_active = True
            return Response(
                {
                    "user": serializer.data,
                    "token": {'refresh': str(refresh), 'access': str(refresh.access_token)}
                }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
                recipient_list = ["201145@astanait.edu.kz"]
                city = request.data["city"]
                company = request.data["company"]
                email = request.data["company"]
                contacts = request.data["contacts"]
                message = "Приветствуем вас! Мы компания пассажироперевозок - " + str(company) \
                          + " - оперируем на территории " + str(city) \
                          + ". Наш email: " + str(email) \
                          + ". Кроме того, вы можете связаться с нами, используя следующие контактные данные: " \
                          + str(contacts)
                EmailMessage(subject, message, email_from, recipient_list, connection=connection).send()

        return Response({
            'success': 'True'
        })


class LoginView(APIView):
    def post(self, request):
        # try:
            login = request.data['login']
            password = request.data['password']

            user = User.objects.filter(login=login).filter(password__exact=password).first()

            refresh = RefreshToken.for_user(user)
            serializer = UserPOSTSerializer(user)
            user = authenticate(request, login=login, password=password)
            return Response({
                'user': serializer.data,
                'token': {'refresh': str(refresh),
                          'access': str(refresh.access_token)}
            })
        # except AttributeError:
        #     return Response({"error": "invalid login or password provided"}, status=400)


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


@api_view([HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_user(request):
    user_id = request.query_params['id']
    user = User.objects.get(id__exact=user_id)
    data = UserGETSerializer(user)
    return Response(data.data)


@permission_classes([IsAuthenticated])
class CompanyView(APIView):
    def post(self, request):
        serializer = CompanyPOSTSerializer(data=request.data)
        if serializer.is_valid():
            serialData = serializer.save()
            serializer = CompanyPOSTSerializer(serialData)
            return Response(
                {"company": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_company(request):
    company_id = request.query_params['id']
    company = Company.objects.filter(id__exact=company_id).first()
    data = CompanyGETSerializer(company)
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


@api_view([HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_city(request):
    city_id = request.query_params['id']
    city = City.objects.filter(id__exact=city_id).first()
    data = CitySerializer(city)
    return Response(data.data)


@permission_classes([IsAuthenticated])
class Companies_citiesView(APIView):
    def post(self, request):
        serializer = Companies_citiesPOSTSerializer(data=request.data)
        if serializer.is_valid():
            serialData = serializer.save()
            serializer = Companies_citiesPOSTSerializer(serialData)
            return Response(
                {"companies_cities": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_companies_cities_by_company(request):
    company_id = request.query_params['id']
    cities = companies_cities.objects.filter(company_id__exact=company_id)
    data = Companies_citiesGETSerializer(cities, many=True)
    return Response(data.data)


@api_view([HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_companies_cities_by_city(request):
    city_id = request.query_params['id']
    companies = companies_cities.objects.filter(city_id__exact=city_id)
    data = Companies_citiesGETSerializer(companies, many=True)
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
