from django.db import models

class Sucursal(models.Model):
    nombre = models.CharField(max_length=40)
    ubicacion = models.CharField(max_length=60)

    def __str__(self):
        return self.nombre

class GrupoProducto(models.Model):
    nombre = models.CharField(max_length=10)
    
    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    descripcion = models.TextField()
    grupo = models.ForeignKey(GrupoProducto, on_delete=models.CASCADE)

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


class Reporte_Venta(models.Model):
    fecha_reporte = models.DateField()
    total_compra = models.IntegerField()
    cantidad_prod_grupo_a = models.IntegerField()
    total_compra_grupo_a = models.IntegerField()
    cantidad_prod_grupo_b = models.IntegerField()
    total_compra_grupo_b = models.IntegerField()
    cantidad_prod_grupo_c = models.IntegerField()
    total_compra_grupo_c = models.IntegerField()
    cantidad_prod_grupo_d = models.IntegerField()
    total_compra_grupo_d = models.IntegerField()
    cantidad_prod_sin_grupo = models.IntegerField()
    total_compra_sin_grupo = models.IntegerField()

    def __str__(self):
        return self.fecha_reporte


class Reporte_Detalle_Producto(models.Model):
    fecha_reporte = models.DateField()
    nombre_producto = models.CharField(max_length=50)
    grupo_producto = models.CharField(max_length=10)
    cantidad_total_vendida = models.IntegerField()
    total_recaudado_prod = models.IntegerField()
    
    def __str__(self):
        return self.fecha_reporte