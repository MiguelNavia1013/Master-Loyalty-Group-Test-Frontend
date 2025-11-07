FRONTEND (Angular 20)
frontend/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── articulos/
│   │   │   ├── tiendas/
│   │   │   ├── clientes/
│   │   │   └── compras/
│   │   └── auth/ (login/logout)
│   ├── assets/
│   └── environments/


Node.js 20.x o superior

Angular CLI:

npm install -g @angular/cli

node -v
npm -v
ng version
Configurar URL del API

Edita el archivo
frontend/src/environments/environment.ts:

export const environment = {
  apiUrl: 'http://localhost:5191/api'
};

Correr el proyecto Angular
npm install
npm start
# o ng serve -o
http://localhost:4200

Flujo general de la aplicación

Login con usuario (admin / admin123).
Se guarda en localStorage para persistir sesión.

Artículos: CRUD completo (alta, baja, modificación).

Tiendas: CRUD y relación con artículos.

Clientes: CRUD.

Compras: Registrar compra y visualizar historial.

Logout: limpia sesión y redirige al login.
