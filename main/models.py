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
    rating = models.FloatField(default=0.0)
    brand = models.CharField(max_length=100, blank=True, null=True)
    thumbnail = models.URLField()
    category = models.CharField(max_length=100)
    stock = models.IntegerField()
    product_views = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    @property
    def is_product_hot(self):
        return self.product_views > 100
        
    def increment_views(self):
        self.product_views += 1
        self.save()