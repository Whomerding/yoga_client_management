# Generated by Django 4.2 on 2023-04-20 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('class_package', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='stripe_payment_url',
            field=models.URLField(max_length=1000),
        ),
    ]
