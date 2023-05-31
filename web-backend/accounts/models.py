from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class MyAccountManager(BaseUserManager):
    def create_user(self):

        user = self.model(
            username='default',
        )

        user.set_password('')
        user.save(using=self._db)
        return user

    def create_superuser(self, password):
        user = self.create_user()
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Role(models.Model):
    id = models.IntegerField(primary_key=True)
    role_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'role'


class Company(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contacts = models.CharField(max_length=255)

    class Meta:
        db_table = 'company'


class User(AbstractBaseUser):
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'login'

    objects = MyAccountManager()

    def __str__(self) -> str:
        return f"{self.id} {self.login}"

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class City(models.Model):
    city_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'city'


class companies_cities(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Meta:
        db_table = 'companies_cities'
