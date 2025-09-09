import uuid
from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('jersey', 'Jersey'),
        ('shoes', 'Shoes'),
        ('ball', 'Ball'),
        ('accessory', 'Accessory'),
    ]

    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    rating = models.FloatField()
    brand = models.CharField(max_length=100, blank=True, null=True)
    thumbnail = models.URLField()
    category = models.CharField(max_length=100)
    stock = models.IntegerField()
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name