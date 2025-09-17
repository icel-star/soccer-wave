from django.forms import ModelForm
from main.models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ["name", "price", "description", "rating", "brand", "thumbnail", "category", "stock", "is_featured"]