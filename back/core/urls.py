from django.urls import path, include
from rest_framework import routers
from core import views 
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'Producto',views.ProductoView,'producto')
router.register(r'Sucursal',views.SucursalView,'sucursal')
router.register(r'GrupoProducto',views.GrupoProductoView,'GrupoProducto')
router.register(r'Compra',views.CompraView,'Compra')
router.register(r'ReporteVenta',views.ReporteVentaView,'ReporteVenta')
router.register(r'ReporteDetalleProducto',views.ReporteDetalleProductoView,'ReporteEstadistico')
router.register(r'User',views.UserView,'User')

urlpatterns = [
    path("",include(router.urls)),
    path("docs/", include_docs_urls(title="API Docs")),
    path('crear_reporte_desde_json/', views.CrearReporteDesdeJSON.as_view(), name='crear-reporte-desde-json'),
    path('reporte_venta/', views.ReporteVentaAPI.as_view(), name='reporte-venta'),
    path('reporte_detalle_producto/', views.ReporteDetalleProductoAPI.as_view(), name='reporte-detalle-producto'),
]