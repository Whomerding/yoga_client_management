# Generated by Django 4.2 on 2023-04-22 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0004_alter_student_classes_remaining_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='status',
            field=models.CharField(blank=True, default='null', max_length=255, null=True),
        ),
    ]
