# Generated by Django 4.2 on 2023-04-21 13:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes_taken', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='classestaken',
            name='classes_taken',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
