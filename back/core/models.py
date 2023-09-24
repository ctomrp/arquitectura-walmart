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

class TipoProducto(models.Model):
    nombre = models.CharField(max_length=30)

    def __str__(self):
        return self.nombre    

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    descripcion = models.TextField()
    tipo = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)
    grupo = models.ForeignKey(GrupoProducto, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre    

class Compra(models.Model):
    fecha_hora_compra = models.DateTimeField()
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    total_compra = models.IntegerField()   

class CompraProducto(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad_comprada = models.IntegerField()

    def __str__(self):
        return f"Compra #{self.compra.id} n/ Producto: {self.producto.nombre}"