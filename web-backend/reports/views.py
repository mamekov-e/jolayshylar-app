from django.shortcuts import render

# Create your views here.

from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from Jolayshylar import static
from accounts.models import Company, User
from accounts.utils import getUserByToken
from transports.models import (
    Transport,
    Stop,
    Stop_record,
    Route,
    Routes_stops
)
from rest_framework.response import Response
from transports.serializers import (
    TransportGETSerializer, TransportPOSTSerializer,
    StopGETSerializer, StopPOSTSerializer,
    Stop_recordGETSerializer, Stop_recordPOSTSerializer,
    RoutePOSTSerializer, RouteGETSerializer,
    Routes_stopsGETSerializer, Routes_stopsPOSTSerializer
)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_reports_of_transport(request):
    try:
        stop_records = Stop_record.objects.filter(has_report=True).filter(
            transport_id__exact=request.query_params.get('transport_id')).filter(
            date__range=(request.query_params.get('start_date'), request.query_params.get('end_date'))).all().order_by("date").distinct("date")
        serializer = Stop_recordGETSerializer(stop_records, many=True)
        return Response(serializer.data)
    except AttributeError:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)

@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_report_of_transport_by_date(request):
    try:
        stop_records = Stop_record.objects.filter(has_report=True).filter(
            transport_id__exact=request.query_params.get('transport_id')).filter(
            date__exact=request.query_params.get('date')).all()
        serializer = Stop_recordGETSerializer(stop_records, many=True)
        return Response(serializer.data)
    except AttributeError:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def export_all_records(request):
    try:
        stop_records = Stop_record.objects.filter(has_report=True).all()
        data = Stop_recordGETSerializer(stop_records, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_records_for_transports_true(request):
    try:
        data = []
        transport_ids = request.query_params.get('ids').split(',')
        transports = Transport.objects.filter(id__in=transport_ids).all()
        for transport in transports:
            stop_records = Stop_record.objects.filter(has_report=True).filter(
                transport__exact=transport.id).all()
            if Stop_recordGETSerializer(stop_records, many=True).data:
                data.append(Stop_recordGETSerializer(stop_records, many=True).data)
        return Response(data)
    except AttributeError:
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)