from django.db import models
import requests
from urllib.parse import urlparse
import my_settings

class Address(models.Model):
    addressname = models.CharField(
        verbose_name = 'address_name',
        max_length = 100,
    )
    locationName = models.CharField(
        verbose_name = 'location_name',
        max_length = 50,
    )
    lat = models.FloatField(
        verbose_name = 'lat',
        blank=True,
        null=True,
    )
    long = models.FloatField(
        verbose_name = 'long',
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.addressname

    def save(self, *args, **kwargs):
        url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + self.addressname
        result = requests.get(urlparse(url).geturl(), headers={'Authorization': f"KakaoAK {my_settings.KAKAO_REST_API_KEY}"}).json()

        match_first = result['documents'][0]['address']
        self.lat = float(match_first['y']) # 위도
        self.long = float(match_first['x']) # 경도
        return super(Address, self).save(*args, **kwargs)