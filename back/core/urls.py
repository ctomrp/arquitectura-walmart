from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import RegisterView, LoginView, LogoutView, UserView, ProductoView, SucursalView, GrupoProductoView, CompraView, CrearReporteDesdeJSON, ReporteVentaAPI, ReporteDetalleProductoAPI

router = routers.DefaultRouter()
router.register(r'Producto', ProductoView, 'producto')
router.register(r'Sucursal', SucursalView, 'sucursal')
router.register(r'GrupoProducto', GrupoProductoView, 'GrupoProducto')
router.register(r'Compra', CompraView, 'Compra')

urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='API Docs')),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('user', UserView.as_view()),
    path('crear_reporte_desde_json/', CrearReporteDesdeJSON.as_view(), name='crear-reporte-desde-json'),
    path('reporte_venta/', ReporteVentaAPI.as_view(), name='reporte-venta'),
    path('reporte_detalle_producto/', ReporteDetalleProductoAPI.as_view(), name='reporte-detalle-producto'),
]