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
from .models import User
from rest_framework.response import Response
from .serializers import (
    UserSerializer,
    MyTokenRefreshSerializer, CompanySerializer, CitySerializer,
)

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
            company = serializer.save()
            serializer = CompanySerializer(company)
            return Response(
                {"company": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)

@permission_classes([IsAuthenticated])
class CityView(APIView):
    def post(self, request):
        serializer = CitySerializer(data=request.data)
        if serializer.is_valid():
            city = serializer.save()
            serializer = CitySerializer(city)
            return Response(
                {"city": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


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
