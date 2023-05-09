from rest_framework import serializers
from .models import Transport, Route, Stop, Routes_stops, Stop_record
from accounts.serializers import CompanyPOSTSerializer

class TransportGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = '__all__'
        depth = 1

class TransportPOSTSerializer(serializers.ModelSerializer):
    # company = CompanyPOSTSerializer()

    # def update(self, instance, validated_data):
    #     if validated_data.get('company'):
    #         company_data = validated_data.get('company')
    #         company_serializer = CompanyPOSTSerializer(data=company_data)
    #
    #         if company_serializer.is_valid():
    #             company = company_serializer.update(instance=instance.company, validated_data=company_serializer.validated_data)
    #             validated_data['company'] = company
    #     return super(TransportPOSTSerializer, self).update(instance, validated_data)

    class Meta:
        model = Transport
        fields = '__all__'



class StopGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = '__all__'
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
    # company = CompanyPOSTSerializer()
    #
    # def update(self, instance, validated_data):
    #     if validated_data.get('company'):
    #         company_data = validated_data.get('company')
    #         company_serializer = CompanyPOSTSerializer(data=company_data)
    #
    #         if company_serializer.is_valid():
    #             company = company_serializer.update(instance=instance.company, validated_data=company_serializer.validated_data)
    #             validated_data['company'] = company
    #
    #     return super(RoutePOSTSerializer, self).update(instance, validated_data)

    class Meta:
        model = Route
        fields = ['id', 'route_number', 'route_name', 'company']


class Routes_stopsGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']
        depth = 2

class Routes_stopsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes_stops
        fields = ['id', 'order', 'route', 'stop']

class Stop_recordGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = '__all__'
        depth = 2

class Stop_recordPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = '__all__'

class Stop_recordReportSwitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop_record
        fields = ['has_report']

class TransportIsTrackingSwitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['is_tracking']