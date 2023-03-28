from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    # getUserByToken,
    get_user,
    MyTokenRefreshView,
    CompanyView,
    CityView,
    Companies_citiesView,
    get_company, get_companies_cities_by_company,
    get_city, get_companies_cities_by_city
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # path('get-user-by-token/', getUserByToken, name='get-user-by-token'),
    path('get-user-by-id/', get_user, name='get-user-by-id'),
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('create-company/', CompanyView.as_view(), name='create-company'),
    path('get-company/', get_company, name='get-company'),
    path('create-city/', CityView.as_view(), name='create-city'),
    path('get-city/', get_city, name='get-city'),
    path('create-companies-cities/', Companies_citiesView.as_view(), name='create-companies-cities'),
    path('get-companies-cities-by-company/', get_companies_cities_by_company, name='get-companies-cities-by-company'),
    path('get-companies-cities-by-city/', get_companies_cities_by_city, name='get-companies-cities-by-city'),
]
