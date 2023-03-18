from django.urls import path
from .views import (
    get_transports_of_company,
    get_record_for_transport,

    TransportView, edit_transport, delete_transport,
    StopView, edit_stop, delete_stop,
    RouteView, edit_route, delete_route,
    CompanyRoutesView, edit_company_routes, delete_company_routes,
    RoutesStopsView, edit_routes_stops, delete_routes_stops, RecordView
)

urlpatterns = [
    path('get-transports-of-company/', get_transports_of_company, name='get-transports-of-company'),
    path('get-record-for-transport/', get_record_for_transport, name='get-record-for-transport'),
    path('add-record/', RecordView.as_view(), name='add-record'),

    # Transports
    path('add-transport/', TransportView.as_view(), name='add-transport'),
    path('edit-transport/', edit_transport, name='edit-transport'),
    path('delete-transport/', delete_transport, name='delete-transport'),

    # Stops
    path('add-stop/', StopView.as_view(), name='add-stop'),
    path('edit-stop/', edit_stop, name='edit-stop'),
    path('delete-stop/', delete_stop, name='delete-stop'),

    # Routes
    path('add-route/', RouteView.as_view(), name='add-route'),
    path('edit-route/', edit_route, name='edit-route'),
    path('delete-route/', delete_route, name='delete-route'),

    # Company routes
    path('add-company-routes/', CompanyRoutesView.as_view(), name='add-company-route'),
    path('edit-company-routes/', edit_company_routes, name='edit-company-route'),
    path('delete-company-routes/', delete_company_routes, name='delete-company-route'),

    # Routes' stops
    path('add-routes-stops/', RoutesStopsView.as_view(), name='add-routes-stops'),
    path('edit-routes-stops/', edit_routes_stops, name='edit-routes-stops'),
    path('delete-routes-stops/', delete_routes_stops, name='delete-routes-stops'),
]
