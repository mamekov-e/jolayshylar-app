import datetime

from django.db import models
from accounts.models import City, Company
# Create your models here.


class Stop(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    stop_name = models.CharField(max_length=255)
    longitude = models.DecimalField(decimal_places=12, max_digits=15, default=0)
    latitude = models.DecimalField(decimal_places=12, max_digits=15, default=0)

    class Meta:
        db_table = 'stop'


class Route(models.Model):
    route_number = models.CharField(max_length=255)
    route_name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Meta:
        db_table = 'route'


class Transport(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    total_seats = models.IntegerField(default=0)
    normal_seats = models.IntegerField(default=0)
    disabled_seats = models.IntegerField(default=0)
    transport_number = models.CharField(max_length=255)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    is_tracking = models.BooleanField(default=False, null=True)

    class Meta:
        db_table = 'transport'


class Routes_stops(models.Model):
    order = models.IntegerField(default=0)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, default=1)
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = 'routes_stops'


class Stop_record(models.Model):
    transport = models.ForeignKey(Transport, on_delete=models.CASCADE)
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE)
    passenger_in = models.IntegerField(default=0)
    passenger_out = models.IntegerField(default=0)
    passengers_now = models.IntegerField(default=0)
    date = models.DateField(blank=True, null=True)
    timestamp = models.TimeField(default=0)
    cycle_amount = models.IntegerField(default=0)
    has_report = models.BooleanField(default=False)

    class Meta:
        db_table = 'stop_record'