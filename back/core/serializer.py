from rest_framework import serializers 
from .models import *
from django.contrib.auth.models import User

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Sucursal
        fields = '__all__'

class GrupoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoProducto
        fields = '__all__'

"""
class ReporteVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte_Venta
        fields = '__all__'
    
class ReporteDetalleProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte_Detalle_Producto
        fields = '__all__'
"""
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
