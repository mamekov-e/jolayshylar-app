from rest_framework import serializers
from .models import Transport, Route, Stop, Routes_stops, Companies_routes, Stop_record

class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'company_id', 'route_id', 'total_seats', 'normal_seats', 'disabled_seats', 'transport_number']

class StopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city_id', 'stop_name']

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'route_number', 'route_name']

class Routes_stopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route_id', 'stop_id']

class Companies_routesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies_routes
        fields = ['id', 'company_id', 'route_id']

class Stop_recordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['id', 'transport_id', 'stop_id', 'passenger_in', 'passenger_out', 'timestamp', 'cycle_amount']