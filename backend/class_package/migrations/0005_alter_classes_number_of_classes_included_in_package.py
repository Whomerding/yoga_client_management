# Generated by Django 4.2 on 2023-05-03 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('class_package', '0004_classes_number_of_classes_included_in_package'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='number_of_classes_included_in_package',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
