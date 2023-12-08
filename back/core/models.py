from django.db import models
from django.contrib.auth.models import AbstractUser

#LAS SIGUIENTES CLASES SE ENCARGAN DE UN USUARIO CUSTOM + JWT
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
#FIN DEL CODIGO PARA USUARIO CUSTOM + JWT


class GrupoProducto(models.Model):
    nombre = models.CharField(max_length=10)
    
    def __str__(self):
        return self.nombre


class Sucursal(models.Model):
    nombre = models.CharField(max_length=40)
    ubicacion = models.CharField(max_length=60)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    descripcion = models.TextField()
    grupo = models.CharField(max_length=10)

    def __str__(self):
        return self.nombre    


class Compra(models.Model):
    fecha_hora_compra = models.DateTimeField()
    producto = models.CharField(max_length=50)
    precio = models.IntegerField()
    grupo_producto = models.CharField(max_length=10, null=True)
    cantidad_comprada = models.IntegerField()
    sucursal = models.CharField(max_length=40)

    def __str__(self):
        return self.fecha_hora_compra
    