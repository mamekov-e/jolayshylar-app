# Generated by Django 4.0.5 on 2023-04-13 15:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transports', '0005_rename_company_companies_routes_company_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='companies_routes',
            old_name='company_id',
            new_name='company',
        ),
        migrations.RenameField(
            model_name='companies_routes',
            old_name='route_id',
            new_name='route',
        ),
        migrations.RenameField(
            model_name='routes_stops',
            old_name='route_id',
            new_name='route',
        ),
        migrations.RenameField(
            model_name='routes_stops',
            old_name='stop_id',
            new_name='stop',
        ),
        migrations.RenameField(
            model_name='stop',
            old_name='city_id',
            new_name='city',
        ),
        migrations.RenameField(
            model_name='stop_record',
            old_name='stop_id',
            new_name='stop',
        ),
        migrations.RenameField(
            model_name='stop_record',
            old_name='transport_id',
            new_name='transport',
        ),
        migrations.RenameField(
            model_name='transport',
            old_name='company_id',
            new_name='company',
        ),
        migrations.RenameField(
            model_name='transport',
            old_name='route_id',
            new_name='route',
        ),
    ]
