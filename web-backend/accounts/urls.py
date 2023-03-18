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
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # path('get-user-by-token/', getUserByToken, name='get-user-by-token'),
    path('get-user-by-id/', get_user, name='get-user-by-id'),
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('create-company/', CompanyView.as_view(), name='create-company'),
    path('create-city/', CityView.as_view(), name='create-city'),
]
