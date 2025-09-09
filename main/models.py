import uuid
from django.db import models

class News(models.Model):
    CATEGORY_CHOICES = [
        ('transfer', 'Transfer'),
        ('update', 'Update'),
        ('exclusive', 'Exclusive'),
        ('match', 'Match'),
        ('rumor', 'Rumor'),
        ('analysis', 'Analysis'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='update')
    thumbnail = models.URLField(blank=True, null=True)
    news_views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    @property
    def is_news_hot(self):
        return self.news_views > 20

    def increment_views(self):
        self.news_views += 1
        self.save()


# Model Product sesuai instruksi tugas
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    rating = models.FloatField()
    brand = models.CharField(max_length=100, blank=True, null=True)
    thumbnail = models.URLField()
    category = models.CharField(max_length=100)
    stock = models.IntegerField()
    is_featured = models.BooleanField(default=False)

    # Contoh atribut tambahan
    stock = models.PositiveIntegerField(default=0)
    brand = models.CharField(max_length=100, blank=True, null=True)
    rating = models.FloatField(default=0, blank=True, null=True)

    def __str__(self):
        return self.name