from rest_framework import serializers 
from .models import *

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'

class CompraProductoSerializer(serializers.ModelSerializer):
    class Meta: 
        model= CompraProducto
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Sucursal
        fields = '__all__'

class GrupoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoProducto
        fields = '__all__'

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'

class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'
        