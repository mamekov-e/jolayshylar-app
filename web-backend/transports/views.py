import datetime

import jwt
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenRefreshView
from Jolayshylar import static
from accounts.models import Company, User
from accounts.utils import getUserByToken
from .models import (
    Transport,
    Stop,
    Stop_record,
    Route,
    Routes_stops
)
from rest_framework.response import Response
from .serializers import (
    TransportGETSerializer, TransportPOSTSerializer,
    StopGETSerializer, StopPOSTSerializer,
    Stop_recordGETSerializer, Stop_recordPOSTSerializer,
    RoutePOSTSerializer, RouteGETSerializer,
    Routes_stopsGETSerializer, Routes_stopsPOSTSerializer,
    Stop_recordReportSwitchSerializer, TransportIsTrackingSwitchSerializer
)
# Create your views here.


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_record_for_transport(request):
    try:
        transport_id = request.query_params.get('id')
        stop_records = Stop_record.objects.filter(has_report=False).filter(
            transport__exact=transport_id).all()
        data = Stop_recordGETSerializer(stop_records, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_transports_of_company(request):
    try:
        user = getUserByToken(request)
        company_id = user.company_id
        transport = Transport.objects.filter(company__exact=company_id)
        data = TransportGETSerializer(transport, many=True)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_routes_of_company(request):
    try:
        user = getUserByToken(request)
        company_id = user.company_id
        route_ids = Route.objects.filter(company_id__exact=company_id).all()
        data = RouteGETSerializer(route_ids, many=True)
        return Response(data.data)
    # except AttributeError:
    #     return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_all_stops(request):
    try:
        stops = Stop.objects.all()
        data = StopGETSerializer(stops, many=True)
        return Response(data.data)
    # except AttributeError:
    #     return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_transport(request):
    try:
        transport_id = request.query_params['id']
        transport = Transport.objects.filter(id__exact=transport_id).first()
        data = TransportGETSerializer(transport)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_routes_stops(request):
    try:
        route_id = request.query_params['id']
        route = Routes_stops.objects.filter(route_id__exact=route_id).all()
        data = Routes_stopsGETSerializer(route, many=True)
        stops = []
        for stop in data.data:
            stops.append(stop['stop'])
        return Response(stops)
    # except AttributeError:
    #     return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.get])
@permission_classes([IsAuthenticated])
def get_stop(request):
    try:
        stop_id = request.query_params['id']
        stop = Stop.objects.filter(id__exact=stop_id).first()
        data = StopGETSerializer(stop)
        return Response(data.data)
    except AttributeError:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


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
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def add_report(request):
    # try:
        transport_ids = request.query_params.get('ids').split(',')
        user = getUserByToken(request)
        report_changed_count = 0
        for transport_id in transport_ids:
            records = Stop_record.objects.filter(transport_id__exact=transport_id).all()
            for record in records:
                if record.has_report == True:
                    continue
                serializer = Stop_recordReportSwitchSerializer(data={
                    "has_report": True
                })
                serializer.is_valid(raise_exception=True)
                Stop_recordReportSwitchSerializer.update(serializer, record,serializer.validated_data)
                report_changed_count+=1

        if report_changed_count == 0:
            return Response("Отчеты этих транспортов уже созданы")

        return Response('Отчеты успешно созданы')



# Transports
@permission_classes([IsAuthenticated])
class TransportView(APIView):
    def post(self, request):
        try:
            user = getUserByToken(request)
            serializer = TransportPOSTSerializer(data={
                "total_seats": request.data['total_seats'],
                "normal_seats": request.data['normal_seats'],
                "disabled_seats": request.data['disabled_seats'],
                "transport_number": request.data['transport_number'],
                "route": request.data['route'],
                "company": user.company_id
            })
            if serializer.is_valid():
                transport = serializer.save()
                serializer_get = TransportGETSerializer(transport)
                data = {
                    "transport": serializer_get.data
                }
                return Response(data)
        except AttributeError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def edit_transport(request):
    # try:
        transport_id = request.data['id']
        user = getUserByToken(request)
        transport = Transport.objects.get(id__exact=transport_id)
        edited_transport_serializer = TransportPOSTSerializer(data=request.data)
        edited_transport_serializer.is_valid(raise_exception=True)
        new_data = TransportPOSTSerializer.update(edited_transport_serializer, transport, edited_transport_serializer.validated_data)
        return Response(edited_transport_serializer.data)
    # except AttributeError:
    #     return Response(new_data.errors, status=status.HTTP_400_BAD_REQUEST)
    # except TypeError:
    #     return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)

@api_view([static.HTTPMethod.put])
@permission_classes([IsAuthenticated])
def change_is_tracking(request):
    # try:
        transport_ids = request.query_params.get('ids').split(',')
        user = getUserByToken(request)
        transports = Transport.objects.filter(id__in=transport_ids)
        for transport in transports:
            serializer = TransportIsTrackingSwitchSerializer(data={
                "is_tracking": request.query_params.get('is_tracking')
            })
            serializer.is_valid(raise_exception=True)
            TransportIsTrackingSwitchSerializer.update(serializer, transport,serializer.validated_data)

        return Response('Ok.')

@permission_classes([IsAuthenticated])
class DeleteTransportView(APIView):
    def delete(self, request, *args, **kwargs):
        # try:
            transport_id = request.query_params.get('ids').split(',')
            transport = Transport.objects.filter(id__in=transport_id)
            transport.delete()
            return Response({'success': True})
        # except AttributeError:
        #     return Response('Транспортов с такими идентификаторами не существует', status=status.HTTP_400_BAD_REQUEST)
        # except TypeError:
        #     return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


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
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


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
        return Response(new_data.errors, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@api_view([static.HTTPMethod.delete])
@permission_classes([IsAuthenticated])
def delete_stop(request):
    try:
        stop_id = request.data['id']
        stop = Stop.objects.get(id__in=stop_id)
        stop.delete()
        return Response({'success': True})
    except AttributeError:
        return Response({'No such entry'}, status=status.HTTP_400_BAD_REQUEST)
    except TypeError:
        return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


# Routes
@permission_classes([IsAuthenticated])
class RouteView(APIView):
    def post(self, request):
        try:
            print(request.data)
            user = getUserByToken(request)
            route_serializer = RoutePOSTSerializer(data={
                "route_name": request.data['route_name'],
                "route_number": request.data['route_number'],
                "company": user.company_id
            })
            print(route_serializer.is_valid())

            route = None
            if route_serializer.is_valid():
                route = route_serializer.save()

                route_serializer = RoutePOSTSerializer(route)

            stops = request.data['stops']
            i = 1
            try:
                for stop in stops:
                    serializer_r = Routes_stopsPOSTSerializer(data={
                        "order": i,
                        "route": route.id,
                        "stop": stop['id']
                    })
                    if serializer_r.is_valid():
                        routes_stops = serializer_r.save()
                        serializer_r = Routes_stopsPOSTSerializer(routes_stops)
                        i = i + 1
            except AttributeError:
                return Response('Запрос содержит недействительные данные', status=status.HTTP_400_BAD_REQUEST)

            return Response(
                {"route": route_serializer.data}
            )

        except AttributeError:
            return Response('Запрос содержит недействительные данные', status=status.HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class EditRouteView(APIView):
    def post(self, request):
        # try:
            user = getUserByToken(request)
            route = Route.objects.get(id__exact=request.data['id'])
            route_serializer = RoutePOSTSerializer(data={
                "route_name": request.data['route_name'],
                "route_number": request.data['route_number'],
                "company": user.company_id
            })
            route_serializer.is_valid(raise_exception=True)
            new_data = RoutePOSTSerializer.update(route_serializer, route, route_serializer.validated_data)

            Routes_stops.objects.filter(route_id__exact=route.id).all().delete()
            stops = request.data['stops']
            i = 1
            try:
                for stop in stops:
                    serializer_r = Routes_stopsPOSTSerializer(data={
                        "order": i,
                        "route": route.id,
                        "stop": stop['id']
                    })
                    if serializer_r.is_valid():
                        routes_stops = serializer_r.save()
                        serializer_r = Routes_stopsPOSTSerializer(routes_stops)
                        i = i + 1
            except AttributeError:
                return Response('Запрос содержит недействительные данные', status=status.HTTP_400_BAD_REQUEST)
            return Response(route_serializer.data)

        # except AttributeError:
        #     return Response(new_data.errors, status=status.HTTP_400_BAD_REQUEST)
        # except TypeError:
        #     return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class DeleteRouteView(APIView):
    def get(self, request, *args, **kwargs):
        ids = request.query_params.get('ids').split(',')
        queryset = Route.objects.filter(id__in=ids)
        serializer = RouteGETSerializer(queryset, many=True)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        try:
            route_id = request.query_params.get('ids').split(',')
            route = Route.objects.filter(id__in=route_id)
            route.delete()
            return Response({'success': True})
        except AttributeError:
            return Response('Маршрутов с такими идентификаторами не существует', status=status.HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response('Неверный тип данных', status=status.HTTP_400_BAD_REQUEST)