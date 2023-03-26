from django.db import models

# Create your models here.


class Transport(models.Model):
    company_id = models.IntegerField(default=0)
    route_id = models.IntegerField(default=0)
    total_seats = models.IntegerField(default=0)
    normal_seats = models.IntegerField(default=0)
    disabled_seats = models.IntegerField(default=0)
    transport_number = models.CharField(max_length=255)


class Stop(models.Model):
    city_id = models.IntegerField(default=0)
    stop_name = models.CharField(max_length=255)


class Route(models.Model):
    route_number = models.CharField(max_length=255)
    route_name = models.CharField(max_length=255)


class Routes_stops(models.Model):
    order = models.IntegerField(default=0)
    route_id = models.IntegerField(default=0)
    stop_id = models.IntegerField(default=0)


class Companies_routes(models.Model):
    company_id = models.IntegerField(default=0)
    route_id = models.IntegerField(default=0)


class Stop_record(models.Model):
    transport_id = models.IntegerField(default=0)
    stop_id = models.IntegerField(default=0)
    passenger_in = models.IntegerField(default=0)
    passenger_out = models.IntegerField(default=0)
    timestamp = models.TimeField(default=0)
    cycle_amount = models.IntegerField(default=0)
