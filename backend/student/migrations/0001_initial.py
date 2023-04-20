# Generated by Django 4.2 on 2023-04-20 02:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('studio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=500)),
                ('phone_number', models.IntegerField()),
                ('email', models.EmailField(max_length=255)),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studio.studio')),
            ],
        ),
    ]
