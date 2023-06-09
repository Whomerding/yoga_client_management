# Generated by Django 4.2 on 2023-04-23 17:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('class_package', '0003_alter_classes_stripe_payment_url'),
        ('student', '0005_student_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='current_class_package',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='class_package.classes'),
        ),
        migrations.AlterField(
            model_name='student',
            name='status',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
