from rest_framework import serializers
from .models import User, Role, City, Company, companies_cities
# Simple JWT Token
from rest_framework_simplejwt.tokens import RefreshToken
from Jolayshylar.settings import SIMPLE_JWT
# Custom Authentication
from accounts.auth_backend import MyAuth


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'login', 'password', 'role']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'role']


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'city_name']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'user_id', 'name', 'address', 'contacts']


class Companies_citiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = companies_cities
        fields = ['id', 'city_id', 'company_id']


class MyTokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField(read_only=True)
    token_class = RefreshToken

    def validate(self, attrs):
        access_token_obj = RefreshToken(attrs['refresh'])
        user_id = access_token_obj['user_id']
        user = MyAuth.authenticate(id=user_id)
        refresh = self.token_class.for_user(user)

        data = {"access": str(refresh.access_token)}
        data["refresh"] = str(refresh)

        if SIMPLE_JWT['ROTATE_REFRESH_TOKENS']:
            if SIMPLE_JWT['BLACKLIST_AFTER_ROTATION']:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            data["refresh"] = str(refresh)

        return data