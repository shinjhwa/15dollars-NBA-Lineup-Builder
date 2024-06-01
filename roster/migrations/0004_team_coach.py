# Generated by Django 5.0.6 on 2024-05-23 02:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roster', '0003_coach'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='coach',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='roster.coach'),
        ),
    ]
