from django.db import models

# Create your models here.
class Producto(models.Model):
    titulo = models.CharField(max_length=100)
    precio = models.PositiveIntegerField()
    descripcion = models.TextField()
    imagen = models.CharField(max_length=555)
    categoria = models.CharField(max_length=100)
