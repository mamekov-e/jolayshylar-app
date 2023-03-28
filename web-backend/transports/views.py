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
    TransportSerializer,
    StopSerializer,
    Stop_recordSerializer,
    RouteSerializer,
    Routes_stopsSerializer,
    Companies_routesSerializer
)
# Create your views here.


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_record_for_transport(request):
    transport_id = request.query_params['id']
    stop_record = Stop_record.objects.filter(transport_id__exact=transport_id)
    data = Stop_recordSerializer(stop_record, many=True)
    return Response(data.data)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_transports_of_company(request):
    company_id = request.query_params['id']
    transport = Transport.objects.filter(company_id__exact=company_id)
    data = TransportSerializer(transport, many=True)
    return Response(data.data)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_transport(request):
    transport_id = request.query_params['id']
    transport = Transport.objects.filter(id__exact=transport_id).first()
    data = TransportSerializer(transport)
    return Response(data.data)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_route(request):
    route_id = request.query_params['id']
    route = Route.objects.filter(id__exact=route_id).first()
    data = RouteSerializer(route)
    return Response(data.data)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_stop(request):
    stop_id = request.query_params['id']
    stop = Stop.objects.filter(id__exact=stop_id).first()
    data = StopSerializer(stop)
    return Response(data.data)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_company_routes(request):
    company_routes_id = request.query_params['id']
    company_routes = Companies_routes.objects.filter(id__exact=company_routes_id).first()
    data = Companies_routesSerializer(company_routes)
    return Response(data.data)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_routes_stops(request):
    routes_stops_id = request.query_params['id']
    routes_stops = Routes_stops.objects.filter(id__exact=routes_stops_id).first()
    data = Routes_stopsSerializer(routes_stops)
    return Response(data.data)

@permission_classes([IsAuthenticated])
class RecordView(APIView):
    def post(self, request):
        serializer = Stop_recordSerializer(data=request.data)
        if serializer.is_valid():
            stop_record = serializer.save()
            serializer = Stop_recordSerializer(stop_record)
            return Response(
                {"stop_record": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


# Transports
@permission_classes([IsAuthenticated])
class TransportView(APIView):
    def post(self, request):
        serializer = TransportSerializer(data=request.data)
        if serializer.is_valid():
            transport = serializer.save()
            serializer = TransportSerializer(transport)
            return Response(
                {"transport": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_transport(request):
    transport_id = request.data['id']
    transport = Transport.objects.get(id__exact=transport_id)
    edit_data = request.data
    edited_transport_serializer = TransportSerializer(data=edit_data)
    edited_transport_serializer.is_valid(raise_exception=True)
    new_data = TransportSerializer.update(transport, edited_transport_serializer.validated_data)

    return Response(new_data.data)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_transport(request):
    transport_id = request.data['id']
    transport = Transport.objects.get(id__exact=transport_id)
    transport.delete()
    return Response({'success': True})


# Stops
@permission_classes([IsAuthenticated])
class StopView(APIView):
    def post(self, request):
        serializer = StopSerializer(data=request.data)
        if serializer.is_valid():
            stop = serializer.save()
            serializer = StopSerializer(stop)
            return Response(
                {"stop": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_stop(request):
    stop_id = request.data['id']
    stop = Stop.objects.get(id__exact=stop_id)
    edit_data = request.data
    edited_stop_serializer = StopSerializer(data=edit_data)
    edited_stop_serializer.is_valid(raise_exception=True)
    new_data = StopSerializer.update(stop, edited_stop_serializer.validated_data)

    return Response(new_data.data)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_stop(request):
    stop_id = request.data['id']
    stop = Stop.objects.get(id__exact=stop_id)
    stop.delete()
    return Response({'success': True})


# Routes
@permission_classes([IsAuthenticated])
class RouteView(APIView):
    def post(self, request):
        serializer = RouteSerializer(data=request.data)
        if serializer.is_valid():
            route = serializer.save()
            serializer = RouteSerializer(route)
            return Response(
                {"route": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_route(request):
    route_id = request.data['id']
    route = Route.objects.get(id__exact=route_id)
    edit_data = request.data
    edited_route_serializer = RouteSerializer(data=edit_data)
    edited_route_serializer.is_valid(raise_exception=True)
    new_data = RouteSerializer.update(route, edited_route_serializer.validated_data)

    return Response(new_data.data)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_route(request):
    route_id = request.data['id']
    route = Route.objects.get(id__exact=route_id)
    route.delete()
    return Response({'success': True})


# Companies Routes
@permission_classes([IsAuthenticated])
class CompanyRoutesView(APIView):
    def post(self, request):
        serializer = Companies_routesSerializer(data=request.data)
        if serializer.is_valid():
            companies_routes = serializer.save()
            serializer = Companies_routesSerializer(companies_routes)
            return Response(
                {"companies_routes": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_company_routes(request):
    companies_routes_id = request.data['id']
    companies_routes = Companies_routes.objects.get(id__exact=companies_routes_id)
    edit_data = request.data
    edited_companies_routes_serializer = Companies_routesSerializer(data=edit_data)
    edited_companies_routes_serializer.is_valid(raise_exception=True)
    new_data = Companies_routesSerializer.update(companies_routes, edited_companies_routes_serializer.validated_data)

    return Response(new_data.data)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_company_routes(request):
    company_routes_id = request.data['id']
    companies_routes = Companies_routes.objects.get(id__exact=company_routes_id)
    companies_routes.delete()
    return Response({'success': True})


# Routes Stops
@permission_classes([IsAuthenticated])
class RoutesStopsView(APIView):
    def post(self, request):
        serializer = Routes_stopsSerializer(data=request.data)
        if serializer.is_valid():
            routes_stops = serializer.save()
            serializer = Routes_stopsSerializer(routes_stops)
            return Response(
                {"routes_stops": serializer.data}
            )
        else:
            data = serializer.errors
            return Response(data, status=400)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_routes_stops(request):
    routes_stops_id = request.data['id']
    routes_stops = Companies_routes.objects.get(id__exact=routes_stops_id)
    edit_data = request.data
    edited_routes_stops_serializer = Routes_stopsSerializer(data=edit_data)
    edited_routes_stops_serializer.is_valid(raise_exception=True)
    new_data = Routes_stopsSerializer.update(routes_stops, edited_routes_stops_serializer.validated_data)

    return Response(new_data.data)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_routes_stops(request):
    routes_stops_id = request.data['id']
    routes_stops = Routes_stopsSerializer.objects.get(id__exact=routes_stops_id)
    routes_stops.delete()
    return Response({'success': True})