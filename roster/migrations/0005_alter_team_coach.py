# Generated by Django 5.0.6 on 2024-05-23 06:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roster', '0004_team_coach'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='coach',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='roster.coach'),
        ),
    ]
