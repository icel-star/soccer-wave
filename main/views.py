from django.shortcuts import render, redirect, get_object_or_404
from main.forms import ProductForm
from main.models import Product

from django.http import HttpResponse
from django.core import serializers

from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

import datetime
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@login_required(login_url='/login')
def show_main(request):
    filter_type = request.GET.get("filter", "all")  # default 'all'

    if filter_type == "all":
        product_list = Product.objects.all()
    else:
        product_list = Product.objects.filter(user=request.user)


    context = {
        'app_name': 'soccer wave',
        'name': 'giselle julia reyna',
        'class': 'PBP A',
        'product_list': product_list, 
        'last_login': request.COOKIES.get('last_login', 'Never')
    }

    return render(request, "main.html", context)

def show_demo(request):
    filter_type = request.GET.get("filter", "all")  # default 'all'

    context = {
        'nama_matkul' : 'pbp'
    }

    return render(request, "demo.html", context)

def create_product(request):
    form = ProductForm(request.POST or None)

    if form.is_valid() and request.method == "POST":
        news_entry = form.save(commit = False)
        news_entry.user = request.user
        news_entry.save()
        return redirect('main:show_main')

    context = {'form': form}
    return render(request, "create_product.html", context)

@login_required(login_url='/login')
def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    product.increment_views()

    context = {
        'product': product
    }

    return render(request, "product_detail.html", context)

def show_xml(request):
     product_list = Product.objects.all()
     xml_data = serializers.serialize("xml", product_list)
     return HttpResponse(xml_data, content_type="application/xml")

def show_json(request):
    product_list = Product.objects.all()
    json_data = serializers.serialize("json", product_list)
    return HttpResponse(json_data, content_type="application/json")

def show_xml_by_id(request, product_id):
   try:
       product_item = Product.objects.filter(pk=product_id)
       xml_data = serializers.serialize("xml", product_item)
       return HttpResponse(xml_data, content_type="application/xml")
   except Product.DoesNotExist:
       return HttpResponse(status=404)

def show_json_by_id(request, product_id):
   try:
       product_item = Product.objects.get(pk=product_id)
       json_data = serializers.serialize("json", [product_item])
       return HttpResponse(json_data, content_type="application/json")
   except Product.DoesNotExist:
       return HttpResponse(status=404)
   
def register(request):
    form = UserCreationForm()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been successfully created!')
            return redirect('main:login')
    context = {'form':form}
    return render(request, 'register.html', context)

def login_user(request):
   if request.method == 'POST':
      form = AuthenticationForm(data=request.POST)

      if form.is_valid():
            user = form.get_user()
            login(request, user)
            response = HttpResponseRedirect(reverse("main:show_main"))
            response.set_cookie('last_login', str(datetime.datetime.now()))
            return response

   else:
      form = AuthenticationForm(request)
   context = {'form': form}
   return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)
    form = ProductForm(request.POST or None, instance=product)
    if form.is_valid() and request.method == 'POST':
        form.save()
        return redirect('main:show_main')

    context = {
        'form': form
    }

    return render(request, "edit_product.html", context)

def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    product.delete()
    return HttpResponseRedirect(reverse('main:show_main'))

# Tambahkan create product dengan AJAX
@csrf_exempt
@login_required(login_url='/login')
def create_product_ajax(request):
    if request.method == 'POST':
        name = request.POST.get("name")
        price = request.POST.get("price")
        description = request.POST.get("description")
        rating = request.POST.get("rating")
        brand = request.POST.get("brand")
        thumbnail = request.POST.get("thumbnail")
        category = request.POST.get("category")
        stock = request.POST.get("stock")
        is_featured = request.POST.get("is_featured") == 'true'

        is_featured = request.POST.get("is_featured")
        if is_featured == 'true':
            is_featured = True
        else:
            is_featured = False

        product = Product.objects.create(
            user=request.user,
            name=name,
            price=price,
            description=description,
            rating=rating,
            brand=brand,
            thumbnail=thumbnail,
            category=category,
            stock=stock,
            is_featured=is_featured
        )

        return JsonResponse({
            'message': 'Product created successfully!',
            'product_id': product.id
        }, status=201)

    return JsonResponse({'error': 'Invalid request'}, status=400)

# Tambahkan view untuk edit product dengan AJAX
@csrf_exempt
@login_required(login_url='/login')
def edit_product_ajax(request, id):
    product = get_object_or_404(Product, pk=id)
    
    if request.method == 'POST':
        product.name = request.POST.get("name")
        product.price = request.POST.get("price")
        product.description = request.POST.get("description")
        product.rating = request.POST.get("rating")
        product.brand = request.POST.get("brand")
        product.thumbnail = request.POST.get("thumbnail")
        product.category = request.POST.get("category")
        product.stock = request.POST.get("stock")
        is_featured = request.POST.get("is_featured")
        if is_featured == 'true':
            product.is_featured = True
        else:
            product.is_featured = False
        product.save()

        return JsonResponse({
            'message': 'Product updated successfully!',
            'product_id': product.id
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)

# Tambahkan view untuk delete product dengan AJAX
@csrf_exempt
@login_required(login_url='/login')
def delete_product_ajax(request, id):
    product = get_object_or_404(Product, pk=id)

    if product.user != request.user:
        return JsonResponse({'error': 'You are not authorized to delete this product'}, status=403)
    
    if request.method == 'DELETE':
        product_id = product.id
        product.delete()
        return JsonResponse({
            'message': 'Product deleted successfully!',
            'product_id': str(product_id)
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)

# Tambahkan view untuk get product JSON
@login_required(login_url='/login')
def get_product_json(request):
    filter_type = request.GET.get('filter', 'all')
    
    print(f"DEBUG: Filter type = {filter_type}")
    print(f"DEBUG: Current user = {request.user} (ID: {request.user.id})")
    
    if filter_type == 'my':
        products = Product.objects.filter(user=request.user)
        print(f"DEBUG: My products count = {products.count()}")
    else:
        products = Product.objects.all()
        print(f"DEBUG: All products count = {products.count()}")
    return HttpResponse(serializers.serialize('json', products), content_type='application/json')