# arquitectura-wallmart

## cómo descargar el proyecto

### 1 - clona el repositorio
Posicionate en el directorio donde quieres guardar el proyecto y ejecuta:

**git clone https://github.com/ctomrp/arquitectura-wallmart.git**



Una vez hecho eso muevete a la carpeta del repositorio y ejecuta:

**git checkout develNombre** para moverte a tu rama (Nombre tuyo).

### 2 - configura tu entorno virtual y poetry
Muevete a la carpeta back y estando en la raíz del proyecto django ejecuta:

**py -m venv venv**

Luego ejecuta **venv\Scripts\Activate.ps1** para activar el entorno virtual.

Una vez ahí instala poetry con:

**pip install poetry**

Y ejecuta **poetry install**

Con eso ya tendrás descargado el proyecto django y sus dependencias.

### 3 - instala angular
**npm install -g @angular/cli**

Con eso ya puedes ejecutar el proyecto angular.
