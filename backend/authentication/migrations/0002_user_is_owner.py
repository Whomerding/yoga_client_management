# Generated by Django 4.2 on 2023-04-20 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_owner',
            field=models.BooleanField(default=False, verbose_name='owner status'),
        ),
    ]
