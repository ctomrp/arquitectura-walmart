import json, os
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import *
from .serializer import *

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
    
    
class CrearReporteDesdeJSON(APIView):
    def post(self, request):
        json_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')

        try:
            with open(json_file_path, 'r') as json_file:
                data = json.load(json_file)

                for compra_data in data:
                    for producto_data in compra_data["productos"]:
                        grupo = producto_data["grupo"]

                        if grupo and grupo in ["a", "b", "c", "d"]:
                            fecha_compra = datetime.strptime(compra_data["fecha_compra"], "%Y-%m-%dT%H:%M:%S")
                            Reporte.objects.create(
                                fecha_reporte=datetime.now(),  # Convierte la fecha al formato deseado
                                compra=fecha_compra,  # Asegúrate de proporcionar el valor correcto aquí
                                producto=producto_data["nombre"],
                                grupo_producto=grupo,
                                cantidad_comprada=producto_data["cantidad"],
                                sucursal=compra_data["sucursal_ID"]
                            )

            return Response({"message": "Reportes creados desde JSON con éxito"}, status=status.HTTP_201_CREATED)

        except FileNotFoundError:
            return Response({"message": "Archivo 'data.json' no encontrado"}, status=status.HTTP_404_NOT_FOUND)