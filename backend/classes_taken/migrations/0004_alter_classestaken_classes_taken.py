# Generated by Django 4.2 on 2023-04-23 17:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes_taken', '0003_classestaken_classes_taken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classestaken',
            name='classes_taken',
            field=models.DateField(default=datetime.datetime.now),
        ),
    ]
