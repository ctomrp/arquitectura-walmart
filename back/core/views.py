import json, os
from datetime import datetime
from django.db import connection
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

class ReporteVentaView(viewsets.ModelViewSet):
    serializer_class = ReporteVentaSerializer
    queryset = Reporte_Venta.objects.all()
    
class ReporteDetalleProductoView(viewsets.ModelViewSet):
    serializer_class = ReporteDetalleProductoSerializer
    queryset = Reporte_Detalle_Producto.objects.all()
        

class CrearReporteDesdeJSON(APIView):
    def post(self, request):
        json_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')

        try:
            with open(json_file_path, 'r') as json_file:
                data = json.load(json_file)

                for compra_data in data:
                    for producto_data in compra_data["productos"]:
                        grupo = producto_data["grupo"]
                        fecha_compra = datetime.strptime(compra_data["fecha_compra"], "%Y-%m-%dT%H:%M:%S")
                        if grupo is None:
                            Compra.objects.create(
                                fecha_hora_compra=fecha_compra,  # Asegúrate de proporcionar el valor correcto aquí
                                producto=producto_data["nombre"],
                                precio=producto_data["precio"],
                                grupo_producto="Sin Grupo",
                                cantidad_comprada=producto_data["cantidad"],
                                sucursal=compra_data["sucursal_ID"]
                            )
                        else:
                            Compra.objects.create(
                                fecha_hora_compra=fecha_compra,  # Asegúrate de proporcionar el valor correcto aquí
                                producto=producto_data["nombre"],
                                precio=producto_data["precio"],
                                grupo_producto=producto_data["grupo"].upper(),
                                cantidad_comprada=producto_data["cantidad"],
                                sucursal=compra_data["sucursal_ID"]
                            )

            return Response({"message": "Guardados los datos de Compra"}, status=status.HTTP_201_CREATED)

        except FileNotFoundError:
            return Response({"message": "Archivo 'data.json' no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        

class ReporteVentaAPI(APIView):
    def post(self, request, format = None):
        query = """
        SELECT 
            DATE() AS "FECHA REPORTE",
            SUM(precio) AS "TOTAL RECAUDADO",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "B"),"C"),"D"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "B"),"C"),"D"),"Sin Grupo") = "A" THEN cantidad_comprada
                END
            ) AS "TOTAL PRODUCTOS GRUPO A",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "B"),"C"),"D"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "B"),"C"),"D"),"Sin Grupo") = "A" THEN precio
                END
            ) AS "TOTAL RECAUDADO PRODUCTOS GRUPO A",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"Sin Grupo") = "B" THEN cantidad_comprada
                END
            ) AS "TOTAL PRODUCTOS GRUPO B",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"Sin Grupo") = "B" THEN precio
                END
            ) AS "TOTAL RECAUDADO PRODUCTOS GRUPO B",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"B"),"D"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"B"),"D"),"Sin Grupo") = "C" THEN cantidad_comprada
                END
            ) AS "TOTAL PRODUCTOS GRUPO C",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"B"),"D"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"B"),"D"),"Sin Grupo") = "C" THEN precio
                END
            ) AS "TOTAL RECAUDADO PRODUCTOS GRUPO C",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"B"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"B"),"Sin Grupo") = "D" THEN cantidad_comprada
                END
            ) AS "TOTAL PRODUCTOS GRUPO D",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"B"),"Sin Grupo") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"B"),"Sin Grupo") = "D" THEN precio
                END
            ) AS "TOTAL RECAUDADO PRODUCTOS GRUPO D",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"B") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"B") = "Sin Grupo" THEN cantidad_comprada
                END
            ) AS "TOTAL PRODUCTOS SIN GRUPO",
            SUM(
                CASE 
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"B") IS NULL THEN 0
                    WHEN NULLIF(NULLIF(NULLIF(NULLIF(grupo_producto, "A"),"C"),"D"),"B") = "Sin Grupo" THEN precio
                END
            ) AS "TOTAL RECAUDADO PRODUCTOS SIN GRUPO"
        FROM 
            core_compra
        ;
    """
        
        with connection.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()
            for resultado in resultados:
                print(resultados)
                Reporte_Venta.objects.create(
                    fecha_reporte = datetime.strptime(resultado[0], "%Y-%m-%d").date(),
                    total_compra = resultado[1],
                    cantidad_prod_grupo_a = resultado[2],
                    total_compra_grupo_a = resultado[3],
                    cantidad_prod_grupo_b = resultado[4],
                    total_compra_grupo_b = resultado[5],
                    cantidad_prod_grupo_c = resultado[6],
                    total_compra_grupo_c = resultado[7],
                    cantidad_prod_grupo_d = resultado[8],
                    total_compra_grupo_d = resultado[9],
                    cantidad_prod_sin_grupo = resultado[10],
                    total_compra_sin_grupo = resultado[11]
                )

        return Response(status=status.HTTP_201_CREATED)
    
class ReporteDetalleProductoAPI(APIView):
    def post(self, request, format = None):
        query = """
            SELECT
                DATE() AS "FECHA REPORTE",
                cc.producto AS "NOMBRE PRODUCTO",
                cc.grupo_producto AS "GRUPO PRODUCTO",
                SUM(cc.cantidad_comprada) AS "CANTIDAD TOTAL VENDIDA PRODUCTO",
                SUM(cc.precio) AS "TOTAL RECAUDADO PRODUCTO"
            FROM
                core_compra cc 
            GROUP BY
                cc.producto,
                cc.grupo_producto
            ;
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()

            for resultado in resultados:
                Reporte_Detalle_Producto.objects.create(
                    fecha_reporte = resultado[0],
                    nombre_producto = resultado[1],
                    grupo_producto = resultado[2],
                    cantidad_total_vendida = resultado[3],
                    total_recaudado_prod = resultado[4]
                )

        return Response(status=status.HTTP_201_CREATED)