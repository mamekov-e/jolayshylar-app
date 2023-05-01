import datetime

import jwt
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from Jolayshylar import static
from accounts.models import Company
from .models import (
    Transport,
    Stop,
    Stop_record,
    Route,
    Routes_stops,
    Companies_routes
)
from rest_framework.response import Response
from .serializers import (
    TransportGETSerializer, TransportPOSTSerializer,
    StopGETSerializer, StopPOSTSerializer,
    Stop_recordGETSerializer, Stop_recordPOSTSerializer,
    RoutePOSTSerializer, RouteGETSerializer,
    Routes_stopsGETSerializer, Routes_stopsPOSTSerializer,
    Companies_routesGETSerializer, Companies_routesPOSTSerializer
)
# Create your views here.


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_record_for_transport(request):
    try:
        transport_id = request.query_params['id']
        stop_record = Stop_record.objects.filter(transport__exact=transport_id)
        data = Stop_recordGETSerializer(stop_record, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_transports_of_company(request):
    try:
        company_id = request.query_params['id']
        transport = Transport.objects.filter(company__exact=company_id)
        data = TransportGETSerializer(transport, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_routes_of_company(request):
    try:
        company_id = request.query_params['id']
        route_ids = Companies_routes.objects.filter(company_id__exact=company_id).select_related('route_id')
        data = Routes_stopsGETSerializer(route_ids, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_stops_of_company(request):
    try:
        company_id = request.query_params['id']
        route_ids = Companies_routes.objects.filter(company_id__exact=company_id).select_related('route_id')
        stops = Stop.objects.filter(routes_stops__route_id__companies_routes__in=route_ids)
        data = StopGETSerializer(stops, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_transport(request):
    try:
        transport_id = request.query_params['id']
        transport = Transport.objects.filter(id__exact=transport_id).first()
        data = TransportGETSerializer(transport)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_route(request):
    try:
        route_id = request.query_params['id']
        route = Route.objects.filter(id__exact=route_id).first()
        data = RouteGETSerializer(route)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_stop(request):
    try:
        stop_id = request.query_params['id']
        stop = Stop.objects.filter(id__exact=stop_id).first()
        data = StopGETSerializer(stop)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_company_routes(request):
    try:
        company_routes_id = request.query_params['id']
        company_routes = Companies_routes.objects.filter(id__exact=company_routes_id).first()
        data = Companies_routesGETSerializer(company_routes)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_routes_stops(request):
    try:
        routes_stops_id = request.query_params['id']
        routes_stops = Routes_stops.objects.filter(id__exact=routes_stops_id)
        data = Routes_stopsGETSerializer(routes_stops, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=400)


@permission_classes([IsAuthenticated])
class RecordView(APIView):
    def post(self, request):
        try:
            serializer = Stop_recordPOSTSerializer(data=request.data)
            if serializer.is_valid():
                stop_record = serializer.save()
                serializer = Stop_recordPOSTSerializer(stop_record)
                return Response(
                    {"stop_record": serializer.data}
                )
        except AttributeError:
            return Response(serializer.errors, status=400)


# Transports
@permission_classes([IsAuthenticated])
class TransportView(APIView):
    def post(self, request):
        try:
            serializer = TransportPOSTSerializer(data=request.data)
            if serializer.is_valid():
                transport = serializer.save()
                serializer = TransportPOSTSerializer(transport)
                data = {
                    "transport": serializer.data
                }
                return Response(data)
        except AttributeError:
            return Response(serializer.errors, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_transport(request):
    try:
        transport_id = request.data['id']
        transport = Transport.objects.get(id__exact=transport_id)
        edit_data = request.data
        edited_transport_serializer = TransportPOSTSerializer(data=edit_data)
        edited_transport_serializer.is_valid(raise_exception=True)
        new_data = TransportPOSTSerializer.update(transport, edited_transport_serializer.validated_data)
        return Response(new_data.data)
    except AttributeError:
        return Response(new_data.errors, status=400)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_transport(request):
    try:
        transport_id = request.data['id']
        transport = Transport.objects.get(id__exact=transport_id)
        transport.delete()
        return Response({'success': True})
    except AttributeError:
        return Response({'No such entry'}, status=400)


# Stops
@permission_classes([IsAuthenticated])
class StopView(APIView):
    def post(self, request):
        try:
            serializer = StopPOSTSerializer(data=request.data)
            if serializer.is_valid():
                stop = serializer.save()
                serializer = StopPOSTSerializer(stop)
                return Response(
                    {"stop": serializer.data}
                )
        except AttributeError:
            return Response(serializer.errors, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_stop(request):
    try:
        stop_id = request.data['id']
        stop = Stop.objects.get(id__exact=stop_id)
        edit_data = request.data
        edited_stop_serializer = StopPOSTSerializer(data=edit_data)
        edited_stop_serializer.is_valid(raise_exception=True)
        new_data = StopPOSTSerializer.update(stop, edited_stop_serializer.validated_data)
        return Response(new_data.data)
    except AttributeError:
        return Response(new_data.errors, status=400)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_stop(request):
    try:
        stop_id = request.data['id']
        stop = Stop.objects.get(id__exact=stop_id)
        stop.delete()
        return Response({'success': True})
    except AttributeError:
        return Response({'No such entry'}, status=400)


# Routes
@permission_classes([IsAuthenticated])
class RouteView(APIView):
    def post(self, request):
        try:
            serializer = RoutePOSTSerializer(data=request.data)
            if serializer.is_valid():
                route = serializer.save()
                serializer = RoutePOSTSerializer(route)
                return Response(
                    {"route": serializer.data}
                )
        except AttributeError:
            return Response(serializer.errors, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_route(request):
    try:
        route_id = request.data['id']
        route = Route.objects.get(id__exact=route_id)
        edit_data = request.data
        edited_route_serializer = RoutePOSTSerializer(data=edit_data)
        edited_route_serializer.is_valid(raise_exception=True)
        new_data = RoutePOSTSerializer.update(route, edited_route_serializer.validated_data)
        return Response(new_data.data)
    except AttributeError:
        return Response(new_data.errors, status=400)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_route(request):
    try:
        route_id = request.data['id']
        route = Route.objects.get(id__exact=route_id)
        route.delete()
        return Response({'success': True})
    except AttributeError:
        return Response({'No such entry'}, status=400)


# Companies Routes
@permission_classes([IsAuthenticated])
class CompanyRoutesView(APIView):
    def post(self, request):
        try:
            serializer = Companies_routesPOSTSerializer(data=request.data)
            if serializer.is_valid():
                companies_routes = serializer.save()
                serializer = Companies_routesPOSTSerializer(companies_routes)
                return Response(
                    {"companies_routes": serializer.data}
                )
        except AttributeError:
            return Response(serializer.errors, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_company_routes(request):
    try:
        companies_routes_id = request.data['id']
        companies_routes = Companies_routes.objects.get(id__exact=companies_routes_id)
        edit_data = request.data
        edited_companies_routes_serializer = Companies_routesPOSTSerializer(data=edit_data)
        edited_companies_routes_serializer.is_valid(raise_exception=True)
        new_data = Companies_routesPOSTSerializer.update(companies_routes, edited_companies_routes_serializer.validated_data)
        return Response(new_data.data)
    except AttributeError:
        return Response(new_data.errors, status=400)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_company_routes(request):
    try:
        company_routes_id = request.data['id']
        companies_routes = Companies_routes.objects.get(id__exact=company_routes_id)
        companies_routes.delete()
        return Response({'success': True})
    except AttributeError:
        return Response({'No such entry'}, status=400)


# Routes Stops
@permission_classes([IsAuthenticated])
class RoutesStopsView(APIView):
    def post(self, request):
        try:
            serializer = Routes_stopsPOSTSerializer(data=request.data)
            if serializer.is_valid():
                routes_stops = serializer.save()
                serializer = Routes_stopsPOSTSerializer(routes_stops)
                return Response(
                    {"routes_stops": serializer.data}
                )
        except AttributeError:
            return Response(serializer.errors, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_routes_stops(request):
    try:
        routes_stops_id = request.data['id']
        routes_stops = Companies_routes.objects.get(id__exact=routes_stops_id)
        edit_data = request.data
        edited_routes_stops_serializer = Routes_stopsPOSTSerializer(data=edit_data)
        edited_routes_stops_serializer.is_valid(raise_exception=True)
        new_data = Routes_stopsPOSTSerializer.update(routes_stops, edited_routes_stops_serializer.validated_data)
        return Response(new_data.data)
    except AttributeError:
        return Response(new_data.errors, status=400)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_routes_stops(request):
    try:
        routes_stops_id = request.data['id']
        routes_stops = Routes_stopsPOSTSerializer.objects.get(id__exact=routes_stops_id)
        routes_stops.delete()
        return Response({'success': True})
    except AttributeError:
        return Response({'No such entry'}, status=400)