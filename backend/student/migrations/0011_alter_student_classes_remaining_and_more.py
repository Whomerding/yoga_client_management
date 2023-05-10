# Generated by Django 4.2 on 2023-05-03 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0010_remove_student_account_current_student_last_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='classes_remaining',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='last_payment',
            field=models.DateField(blank=True, null=True),
        ),
    ]