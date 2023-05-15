from django.urls import path
from .views import (
    get_transports_of_company, get_record_for_transport, get_transport,
    get_routes_stops, get_stop, get_routes_of_company, get_all_routes,
    get_all_stops, get_last_record_for_transport, get_closest_routes,

    TransportView, edit_transport, change_is_tracking, add_report, DeleteTransportView, get_tracked_transports_of_route,
    StopView, edit_stop, delete_stop,
    RouteView, EditRouteView, DeleteRouteView, RecordView
)

urlpatterns = [
    path('get-transports-of-company/', get_transports_of_company, name='get-transports-of-company'),
    path('get-record-for-transport/', get_record_for_transport, name='get-record-for-transport'),
    path('get-last-record-for-transport/', get_last_record_for_transport, name='get-last-record-for-transport'),
    path('add-record/', RecordView.as_view(), name='add-record'),
    path('get-closest-routes/', get_closest_routes, name='get-closest-routes'),

    # Transports
    path('add-transport/', TransportView.as_view(), name='add-transport'),
    path('edit-transport/', edit_transport, name='edit-transport'),
    path('change-is-tracking/', change_is_tracking, name='change-is-tracking'),
    path('add-report/', add_report, name='add-report'),
    path('delete-transport/', DeleteTransportView.as_view(), name='delete-transport'),
    path('get-transport/', get_transport, name='get-transport'),
    path('get-tracked-transports-of-route/', get_tracked_transports_of_route, name='get-tracked-transports-of-route'),

    # Stops
    path('add-stop/', StopView.as_view(), name='add-stop'),
    path('edit-stop/', edit_stop, name='edit-stop'),
    path('delete-stop/', delete_stop, name='delete-stop'),
    path('get-stop/', get_stop, name='get-stop'),
    path('get-all-stops/', get_all_stops, name='get-all-stops'),

    # Routes
    path('add-route/', RouteView.as_view(), name='add-route'),
    path('edit-route/', EditRouteView.as_view(), name='edit-route'),
    path('delete-route/', DeleteRouteView.as_view(), name='delete-route'),
    path('get-routes-stops/', get_routes_stops, name='get-routes-stops'),
    path('get-routes-of-company/', get_routes_of_company, name='get-routes-of-company'),
    path('get-all-routes/', get_all_routes, name='get-all-routes'),
]
