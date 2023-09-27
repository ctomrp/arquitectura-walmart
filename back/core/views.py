from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class CompraView(viewsets.ModelViewSet):
    serializer_class = CompraSerializer
    queryset = Compra.objects.all()

class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all() 

class GrupoProductoView(viewsets.ModelViewSet):
    serializer_class = GrupoProductoSerializer
    queryset = GrupoProducto.objects.all() 

class TipoProductoView(viewsets.ModelViewSet):
    serializer_class = TipoProductoSerializer 
    queryset = TipoProducto.objects.all() 

class CompraProductoView(viewsets.ModelViewSet):
    serializer_class = CompraProductoSerializer
    queryset = CompraProducto.objects.all() 

class ReporteView(viewsets.ModelViewSet):
    serializer_class = ReporteSerializer
    queryset = Reporte.objects.all()