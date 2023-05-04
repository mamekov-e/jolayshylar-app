from django.urls import path
from .views import (
    get_transports_of_company, get_record_for_transport, get_transport,
    get_route, get_stop, get_routes_stops, get_routes_of_company,
    get_stops_of_company,

    TransportView, edit_transport, DeleteTransportView,
    StopView, edit_stop, delete_stop,
    RouteView, EditRouteView, DeleteRouteView, RecordView
)

urlpatterns = [
    path('get-transports-of-company/', get_transports_of_company, name='get-transports-of-company'),
    path('get-record-for-transport/', get_record_for_transport, name='get-record-for-transport'),
    path('add-record/', RecordView.as_view(), name='add-record'),

    # Transports
    path('add-transport/', TransportView.as_view(), name='add-transport'),
    path('edit-transport/', edit_transport, name='edit-transport'),
    path('delete-transport/', DeleteTransportView.as_view(), name='delete-transport'),
    path('get-transport/', get_transport, name='get-transport'),

    # Stops
    path('add-stop/', StopView.as_view(), name='add-stop'),
    path('edit-stop/', edit_stop, name='edit-stop'),
    path('delete-stop/', delete_stop, name='delete-stop'),
    path('get-stop/', get_stop, name='get-stop'),
    path('get-stops-of-company/', get_stops_of_company, name='get-stops-of-company'),

    # Routes
    path('add-route/', RouteView.as_view(), name='add-route'),
    path('edit-route/', EditRouteView.as_view(), name='edit-route'),
    path('delete-route/', DeleteRouteView.as_view(), name='delete-route'),
    path('get-route/', get_route, name='get-route'),
    path('get-routes-of-company/', get_routes_of_company, name='get-routes-of-company'),

    # Routes Stops
    path('get-routes-stops/', get_routes_stops, name='get-routes-stops'),
]
