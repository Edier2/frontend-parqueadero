# Sistema de Parqueadero — Proyecto SENA ADSO

Sistema web full-stack para la gestión de un parqueadero empresarial. Desarrollado como evidencia del programa de formación **Análisis y Desarrollo de Software (ADSO)** del SENA.

Permite registrar, consultar, editar y eliminar vehículos con autenticación segura mediante JWT, interfaz glassmorphism con soporte de modo oscuro/claro.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js |
| Framework backend | Express.js |
| Base de datos | MySQL (phpMyAdmin) |
| Autenticación | JWT (JSON Web Token) |
| Motor de vistas | EJS |
| Estilos | CSS3 (Glassmorphism + Dark Mode) |
| Cliente | HTML5 + JavaScript Vanilla |

---

## Funcionalidades

### Autenticación
- Login con usuario y contraseña
- Generación y validación de token JWT
- Rutas protegidas por token (Bearer)
- Persistencia de sesión con `localStorage`

### Gestión de vehículos (CRUD completo)
- Registrar vehículo con placa y tipo (Carro / Moto)
- Listar todos los vehículos registrados
- Editar el tipo de un vehículo existente
- Eliminar vehículo con confirmación

### Interfaz
- Diseño glassmorphism responsive
- Modo oscuro / claro con preferencia guardada
- Pantalla de bienvenida animada con barra de progreso

---

## Estructura del proyecto

```
parqueadero/
├── backend-parqueadero/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── vehiculos.routes.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── db.js
│   ├── app.js
│   └── package.json
│
└── frontend-parqueadero/
    ├── views/
    │   ├── login.ejs
    │   └── vehiculos.ejs
    ├── public/
    │   └── styles.css
    ├── app.js
    └── package.json
```

---

## Instalación y ejecución

### Requisitos previos
- Node.js v18 o superior
- MySQL corriendo localmente
- phpMyAdmin (opcional, para visualizar la base de datos)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/parqueadero-sena.git
cd parqueadero-sena
```

### 2. Configurar la base de datos

Importa el archivo SQL en phpMyAdmin o ejecuta en MySQL:

```sql
CREATE DATABASE parqueadero;
USE parqueadero;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE vehiculos (
    placa VARCHAR(10) PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL
);

INSERT INTO usuarios (usuario, password) VALUES ('admin', '1234');
```

### 3. Ejecutar el backend

```bash
cd backend-parqueadero
npm install
npm run dev
```

Backend disponible en: `http://localhost:3001`

### 4. Ejecutar el frontend

```bash
cd frontend-parqueadero
npm install
node app.js
```

Frontend disponible en: `http://localhost:4000`

---

## Endpoints de la API

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/auth/login` | Iniciar sesión | No |
| GET | `/api/vehiculos` | Listar vehículos | JWT |
| POST | `/api/vehiculos` | Crear vehículo | JWT |
| PUT | `/api/vehiculos/:placa` | Editar vehículo | JWT |
| DELETE | `/api/vehiculos/:placa` | Eliminar vehículo | JWT |

---

## Credenciales de prueba

```
Usuario:    admin
Contraseña: 1234
```

---

## Flujo del sistema

```
Usuario → Login → Backend valida → Genera JWT
    → Frontend guarda token → Consume API protegida
    → Gestión de vehículos (Crear / Leer / Editar / Eliminar)
```

---

## Aprendiz

| Campo | Detalle |
|-------|---------|
| Programa | Análisis y Desarrollo de Software — ADSO |
| Institución | SENA |
| Ficha | 3186583 |
| Aprendiz | EDIER SAID CUENCA GUZMÁN |
| Instructor | LUIS BECERRA RENTERIA |

---

## Licencia

Proyecto educativo desarrollado con fines académicos para el SENA.