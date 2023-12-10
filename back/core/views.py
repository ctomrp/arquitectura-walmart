import datetime as dt, json, jwt, os
from datetime import datetime
from django.db import connection
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from .models import Compra, GrupoProducto, Producto, Sucursal, User
from .serializers import CompraSerializer, GrupoProductoSerializer, ProductoSerializer, SucursalSerializer, UserSerializer

#LAS SIGUIENTES CLASES SE ENCARGAN DE UN USUARIO CUSTOM + JWT
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        userSuper = User.objects.get(groups_id=1)
        userAnal = User.objects.get(groups_id=2)
        

        if user == userSuper:
            group_name = 'Supervisor'
        elif user == userAnal:
            group_name = 'Analista'
        else:
            group_name = None
   

        payload = {
            'id': user.id,
            'exp': dt.datetime.utcnow() + dt.timedelta(minutes=60),
            'iat': dt.datetime.utcnow(),
            'group': group_name
        }
        print(payload)
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        print(response)
        return response
    

class UserView(APIView):    
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
    

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
#FIN DEL CODIGO PARA USUARIO CUSTOM + JWT


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

class CrearReporteDesdeJSON(APIView):
    def post(self, request):
        json_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')

        try:
            with open(json_file_path, 'r') as json_file:
                data = json.load(json_file)

                for compra_data in data:
                    for producto_data in compra_data["productos"]:
                        for sucursal_data in compra_data["sucursal"]:
                            grupo = producto_data["grupo"]
                            fecha_compra = datetime.strptime(compra_data["fecha_compra"], "%Y-%m-%dT%H:%M:%S")
                            
                            grupoExistente = GrupoProducto.objects.filter(
                                nombre = grupo
                            ).first()

                            sucursalExistente = Sucursal.objects.filter(
                                id = sucursal_data["sucursal_ID"],
                                nombre = sucursal_data["nombre_sucursal"],
                                ubicacion = sucursal_data["ubicacion"]
                            )

                            if sucursalExistente:
                                pass
                            else:
                                Sucursal.objects.create(
                                    id = sucursal_data["sucursal_ID"],
                                    nombre = sucursal_data["nombre_sucursal"],
                                    ubicacion = sucursal_data["ubicacion"]
                                )

                            if grupo is None:
                                productoExistente = Producto.objects.filter(
                                    nombre = producto_data["nombre"],
                                    grupo = "Sin Grupo"
                                )
                                if productoExistente:
                                    pass
                                else:
                                    Producto.objects.create(
                                        nombre = producto_data["nombre"],
                                        precio = producto_data["precio"],
                                        descripcion = producto_data["descripcion"],
                                        grupo = "Sin Grupo"
                                    )
                                Compra.objects.create(
                                    fecha_hora_compra=fecha_compra,  # Asegúrate de proporcionar el valor correcto aquí
                                    producto=producto_data["nombre"],
                                    precio=producto_data["precio"],
                                    grupo_producto="Sin Grupo",
                                    cantidad_comprada=producto_data["cantidad"],
                                    sucursal=sucursal_data["sucursal_ID"]
                                )
                            else:
                                if grupoExistente:
                                    pass
                                else:
                                    GrupoProducto.objects.create(
                                        nombre = grupo
                                    )
                                    GrupoProducto.objects.all().order_by('nombre').values()
                                
                                productoExistente = Producto.objects.filter(
                                    nombre = producto_data["nombre"],
                                    grupo = producto_data["grupo"]
                                )

                                if productoExistente:
                                    pass
                                else:
                                    Producto.objects.create(
                                        nombre = producto_data["nombre"],
                                        precio = producto_data["precio"],
                                        descripcion = producto_data["descripcion"],
                                        grupo = producto_data["grupo"]
                                    )
                                Compra.objects.create(
                                    fecha_hora_compra=fecha_compra,  # Asegúrate de proporcionar el valor correcto aquí
                                    producto=producto_data["nombre"],
                                    precio=producto_data["precio"],
                                    grupo_producto=producto_data["grupo"],
                                    cantidad_comprada=producto_data["cantidad"],
                                    sucursal=sucursal_data["sucursal_ID"]
                                )

                            

            return Response({"message": "Guardados los datos de Compra"}, status=status.HTTP_201_CREATED)

        except FileNotFoundError:
            return Response({"message": "Archivo 'data.json' no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        

class ReporteVentaAPI(APIView):
    def get(self, request, format = None):
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
            
            data = [
                {
                    "fecha_reporte": datetime.strptime(resultado[0], "%Y-%m-%d").date(),
                    "total_compra": resultado[1],
                    "cantidad_prod_grupo_a": resultado[2],
                    "total_compra_grupo_a": resultado[3],
                    "cantidad_prod_grupo_b": resultado[4],
                    "total_compra_grupo_b": resultado[5],
                    "cantidad_prod_grupo_c": resultado[6],
                    "total_compra_grupo_c": resultado[7],
                    "cantidad_prod_grupo_d": resultado[8],
                    "total_compra_grupo_d": resultado[9],
                    "cantidad_prod_sin_grupo": resultado[10],
                    "total_compra_sin_grupo": resultado[11]
                }
                for resultado in resultados
            ]

        return JsonResponse(data, safe=False)

class ReporteDetalleProductoAPI(APIView):
    def get(self, request, format=None):  # Cambiado a método GET
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

        # Formatear los resultados como un JSON
        data = [
            {
                "fecha_reporte": str(resultado[0]),
                "nombre_producto": resultado[1],
                "grupo_producto": resultado[2],
                "cantidad_total_vendida": resultado[3],
                "total_recaudado_prod": resultado[4],
            }
            for resultado in resultados
        ]

        return JsonResponse(data, safe=False)