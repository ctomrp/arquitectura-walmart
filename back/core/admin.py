from django.contrib import admin
from .models import GrupoProducto, Producto
from django.contrib.auth.models import User
from django import forms

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        exclude = []

class ProductoAdmin(admin.ModelAdmin):
    def has_module_permission(self, request):
        if request.user.username == 'supervisorlocal':
            return True
        return False

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if request.user.username == 'supervisorlocal':
            form.base_fields['grupo'].widget.can_add_related = False
        return form

class GrupoProductoAdmin(admin.ModelAdmin):
    def has_module_permission(self, request):
        if request.user.username == 'analista':
            return True
        return False

    def has_change_permission(self, request, obj=None):
        if request.user.username == 'supervisorlocal':
            return False  # Evita que supervisorlocal edite GrupoProducto
        return True

class CustomAdminSite(admin.AdminSite):
    def has_permission(self, request):
        if request.user.is_superuser:
            if request.user.username == 'analista':
                return True
            elif request.user.username == 'supervisorlocal':
                return True
        return False

    def app_index(self, request, app_label, extra_context=None):
        if app_label == 'auth':
            return None
        return super().app_index(request, app_label, extra_context)

custom_admin_site = CustomAdminSite()
admin.site = custom_admin_site

if User.objects.filter(username='analista').exists():
    admin.site.register(GrupoProducto, GrupoProductoAdmin)

if User.objects.filter(username='supervisorlocal').exists():
    admin.site.register(Producto, ProductoAdmin)
