from rest_framework import serializers
from .models import Transport, Route, Stop, Routes_stops, Companies_routes, Stop_record

class TransportGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'company', 'route', 'total_seats', 'normal_seats', 'disabled_seats', 'transport_number']
        depth = 1

class TransportPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'company', 'route', 'total_seats', 'normal_seats', 'disabled_seats', 'transport_number']

class StopGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city', 'stop_name']
        depth = 1

class StopPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city', 'stop_name']

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'route_number', 'route_name']

class Routes_stopsGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']
        depth = 1

class Routes_stopsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']

class Companies_routesGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies_routes
        fields = ['id', 'company', 'route']
        depth = 1

class Companies_routesPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies_routes
        fields = ['id', 'company', 'route']

class Stop_recordGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['id', 'transport', 'stop', 'passenger_in', 'passenger_out', 'timestamp', 'cycle_amount']
        depth = 1

class Stop_recordPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['id', 'transport', 'stop', 'passenger_in', 'passenger_out', 'timestamp', 'cycle_amount']