# Generated by Django 3.2.15 on 2022-08-28 19:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addressname', models.CharField(max_length=100, verbose_name='address_name')),
                ('locationname', models.CharField(max_length=50, verbose_name='location_name')),
                ('lat', models.FloatField(blank=True, null=True, verbose_name='lat')),
                ('long', models.FloatField(blank=True, null=True, verbose_name='long')),
            ],
            options={
                'db_table': 'addresses',
            },
        ),
        migrations.AddField(
            model_name='post',
            name='address',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='post.address'),
        ),
    ]