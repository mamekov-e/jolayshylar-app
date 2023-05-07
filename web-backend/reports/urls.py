from django.urls import path

from .views import (
    get_reports_of_transport, export_all_records, get_records_for_transports_true
)

urlpatterns = [
    path('get-reports-of-transport/', get_reports_of_transport, name='get-reports-of-transport'),
    path('export-all-records/', export_all_records, name='export-all-records'),
    path('export-records/', get_records_for_transports_true, name='export-records'),
]

