# CEIoT - Desarrollo de Aplicaciones Multiplataformas

## Trabajo final - Sistema de Riego basado en Ionic 

Configuracion y uso:

1) Clonar el repositorio
    git clone https://github.com/martinbrocca/CEIoT_DAM_TPFinal.git
2) Front-End:
   1) correr el comando 'ionic repair' en la carpeta ./src/frontend/
   2) una vez regeneradas las carpetas de componentes de Angular, correr 'ionic serve'
3) Back-End:
   1) en el directorio principal de la clonacion:
      1) Correr docker-compose up
      2) si la base de datos no inicializara correctamente, ejecutar el script TPFinal.sql de la carpeta DB/Dumps/TPFinal.sql, esto se debe a que la aplicacion fallara si no hay lecturas de dispositivos

## Arquitectura de la aplicacion:

La aplicacion consta de un backend, desarrallado en NodeJS, y de un frontend, desarrollado en Ionic.
En la siguiente figura se pueden ver las interacciones de la aplicacion de frontend con el backend:
![architecture](doc/architecture.png)

Estructura de APIs del backend:

### Device API:
![deviceAPI](doc/DeviceAPI.png)

### LogRiego API:
![LogRiegoAPI](doc/LogRiegoApi.png)

### Measures API:
![MeasuresAPI](doc/MeasuresAPI.png)