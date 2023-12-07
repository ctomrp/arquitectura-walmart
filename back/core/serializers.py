from rest_framework import serializers
from .models import Compra, GrupoProducto, Producto, Sucursal, User

#LAS SIGUIENTES CLASES SE ENCARGAN DE UN USUARIO CUSTOM + JWT
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
#FIN DEL CODIGO PARA USUARIO CUSTOM + JWT


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