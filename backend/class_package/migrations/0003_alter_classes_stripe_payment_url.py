# Generated by Django 4.2 on 2023-04-21 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('class_package', '0002_alter_classes_stripe_payment_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='stripe_payment_url',
            field=models.URLField(blank=True, max_length=1000, null=True),
        ),
    ]