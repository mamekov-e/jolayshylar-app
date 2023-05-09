from django.urls import path

from .views import (
    get_reports_of_transport, get_report_of_transport_by_date, export_all_records, get_records_for_transports_true
)

urlpatterns = [
    path('get-reports-of-transport/', get_reports_of_transport, name='get-reports-of-transport'),
    path('get-report-of-transport-by-date/', get_report_of_transport_by_date, name='get-report-of-transport-by-date'),
    path('export-all-records/', export_all_records, name='export-all-records'),
    path('export-records/', get_records_for_transports_true, name='export-records'),
]

