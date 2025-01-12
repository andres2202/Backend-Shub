# Backend-sHUB Technical test

**Project:** Technical Test in sHUB

**Deployment Infrastructure:** Docker and Render

**Link de la documentación desplegada:** https://backend-shub.onrender.com/api-docs/

> [!IMPORTANT]
> Link de la documentacion de los endpoints:

- [Backend](#backend)
  - [Instalacion Local](#local-installation)
  - [Instalacion en Docker ](#docker-installation)
  - [Documentacion](#documentation)

## Backend

El backend de la aplicación fue desarrollado en TypeScript utilizando Node.js y Express.js como framework principal. Se implementó una base de datos PostgreSQL para gestionar y almacenar de manera eficiente la información relacionada con las reservas y otros datos clave del sistema. 

### Instalacion Local

Para instalar el backend de la aplicación de forma local, se debe seguir los siguientes pasos:

1. Instalar las dependencias y compilar

```bash
npm install && npm run build
````

2. Crear el archivo `.env` en la ruta raiz del backend y agregar el contenido, puede usar `.env.template` como referencia.

3. Iniciar el servidor

```bash
npm run dev
```

4. Acceder a la documentación de la API en `http://localhost:3000/api-docs`

### Instalacion en Docker

1. Crear el archivo `.env` en la ruta raiz del backend y agregar el contenido, puede usar `.env.template` como referencia.
2. Ejecutar el docker-compose usando: ` docker-compose -f docker-compose.dev.yml up`

### Estructura del proyecto

El backend se realizo con una arquitectura n-capas, lo que facilita la escalabilidad y mantenimiento del código, a continuación se muestra la estructura de carpetas del backend:

```bash
backend
├── src
│   ├── controllers
│   ├── helpers
│   ├── interfaces
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── index.ts
├── .env
├── .env.template
├── .gitignore
├── docker-compose.dev.yml
├── Dockerfile
```