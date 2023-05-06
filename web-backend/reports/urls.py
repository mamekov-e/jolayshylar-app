from django.urls import path

from .views import (
    get_reports_of_transport,
)

urlpatterns = [
    path('get-reports-of-transport/', get_reports_of_transport, name='get-reports-of-transport')
]

