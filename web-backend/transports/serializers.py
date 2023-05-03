from rest_framework import serializers
from .models import Transport, Route, Stop, Routes_stops, Stop_record
from accounts.serializers import CompanyPOSTSerializer

class TransportGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'company', 'total_seats', 'normal_seats', 'disabled_seats', 'transport_number', 'route']
        depth = 1

class TransportPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'company', 'total_seats', 'normal_seats', 'disabled_seats', 'transport_number', 'route']

class StopGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city', 'stop_name']
        depth = 1

class StopPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'city', 'stop_name']

class RouteGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'route_number', 'route_name', 'company']
        depth = 1

class RoutePOSTSerializer(serializers.ModelSerializer):
    company = CompanyPOSTSerializer()

    def update(self, instance, validated_data):
        if validated_data.get('company'):
            company_data = validated_data.get('company')
            company_serializer = CompanyPOSTSerializer(data=company_data)

            if company_serializer.is_valid():
                company = company_serializer.update(instance=instance.profile)
                validated_data['company'] = company

        return super(RoutePOSTSerializer, self).update(instance, validated_data)

    class Meta:
        model = Route
        fields = ['id', 'route_number', 'route_name', 'company']


class Routes_stopsGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']
        depth = 1

class Routes_stopsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']

class Stop_recordGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['id', 'transport', 'stop', 'passenger_in', 'passenger_out', 'timestamp', 'cycle_amount']
        depth = 1

class Stop_recordPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['id', 'transport', 'stop', 'passenger_in', 'passenger_out', 'timestamp', 'cycle_amount']