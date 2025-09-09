from django.shortcuts import render

# Create your views here.
def show_main(request):
    context = {
        'app_name' : 'soccer wave',
        'name': 'giselle julia reyna',
        'class': 'PBP A'
    }

    return render(request, "main.html", context)