from django.db import models


# Create your models here.
class User(models.Model):
    login = models.CharField(max_length=255)
    password = models.CharField(max_length=255, unique=True)
    role = models.ForeignKey('Role', on_delete=models.CASCADE)

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
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contacts = models.CharField(max_length=255)


class companies_cities(models.Model):
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    company = models.ForeignKey('Company', on_delete=models.CASCADE)