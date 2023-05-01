from django.db import models
from accounts.models import City, Company
# Create your models here.


class Stop(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    stop_name = models.CharField(max_length=255)
    longitude = models.IntegerField(default=0)
    latitude = models.IntegerField(default=0)

    class Meta:
        db_table = 'stop'


class Route(models.Model):
    route_number = models.CharField(max_length=255)
    route_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'route'


class Transport(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    total_seats = models.IntegerField(default=0)
    normal_seats = models.IntegerField(default=0)
    disabled_seats = models.IntegerField(default=0)
    transport_number = models.CharField(max_length=255)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)

    class Meta:
        db_table = 'transport'


class Routes_stops(models.Model):
    order = models.IntegerField(default=0)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, default=1)
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = 'routes_stops'


class Companies_routes(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, default=1)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = 'companies_routes'


class Stop_record(models.Model):
    transport = models.ForeignKey(Transport, on_delete=models.CASCADE)
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE)
    passenger_in = models.IntegerField(default=0)
    passenger_out = models.IntegerField(default=0)
    timestamp = models.TimeField(default=0)
    cycle_amount = models.IntegerField(default=0)

    class Meta:
        db_table = 'stop_record'