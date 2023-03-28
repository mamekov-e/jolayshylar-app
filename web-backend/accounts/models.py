from django.db import models


# Create your models here.
class User(models.Model):
    login = models.CharField(max_length=255)
    password = models.CharField(max_length=255, unique=True)
    role = models.IntegerField(default=0)

    def check_password(self, request):
        if User.objects.filter(password=request).first():
            return True
        else:
            return False


class Role(models.Model):
    role = models.CharField(max_length=255)


class City(models.Model):
    city_name = models.CharField(max_length=255)


class Company(models.Model):
    user_id = models.IntegerField(default=0)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contacts = models.CharField(max_length=255)


class companies_cities(models.Model):
    city_id = models.IntegerField(default=0)
    company_id = models.IntegerField(default=0)