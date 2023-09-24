from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ProductoSerializer,CompraSerializer
from .models import Producto,Compra

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class CompraView(viewsets.ModelViewSet):
    serializer_class = CompraSerializer
    queryset = Compra.objects.all()
 