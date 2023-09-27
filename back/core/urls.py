from django.urls import path, include
from rest_framework import routers
from core import views 
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'Producto',views.ProductoView,'producto')
router.register(r'Sucursal',views.SucursalView,'sucursal')
router.register(r'GrupoProducto',views.GrupoProductoView,'GrupoProducto')
router.register(r'TipoProducto',views.TipoProductoView,'TipoProducto')
router.register(r'Compra',views.CompraView,'Compra')
router.register(r'CompraProducto',views.CompraProductoView,'CompraProducto')

urlpatterns = [
    path("",include(router.urls)),
    path("docs/", include_docs_urls(title="API Docs"))
]