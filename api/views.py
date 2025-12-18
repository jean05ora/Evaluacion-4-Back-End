from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from productos.models import Producto
from .serializer import ProductoSerializer

# Create your views here.
def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def producto(request):
    producto_random = Producto.objects.order_by("?").first()
    
    random_json = ProductoSerializer(producto_random)
    
    return Response(random_json.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def productos(request):
    productos = Producto.objects.all()
    productos_json = ProductoSerializer(productos, many=True)
    
    return Response(productos_json.data)

def token(request):
    return render(request, 'conToken.html')