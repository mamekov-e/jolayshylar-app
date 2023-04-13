from rest_framework import serializers
from .models import Transport, Route, Stop, Routes_stops, Companies_routes, Stop_record

class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'company', 'route', 'total_seats', 'normal_seats', 'disabled_seats', 'transport_number']
        depth = 2

class StopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city', 'stop_name']
        depth = 1

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'route_number', 'route_name']

class Routes_stopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']
        depth = 2

class Companies_routesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies_routes
        fields = ['id', 'company', 'route']
        depth = 2

class Stop_recordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['id', 'transport', 'stop', 'passenger_in', 'passenger_out', 'timestamp', 'cycle_amount']
        depth = 2