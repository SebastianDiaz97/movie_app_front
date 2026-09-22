# 🎬 Movie App

Aplicación web para explorar películas y series, consultar información detallada y gestionar una lista personal de contenido.

El proyecto está desarrollado con **React + TypeScript** y utiliza la API de **The Movie Database (TMDB)** para obtener información sobre películas, series, trailers, reparto y plataformas de streaming. Además, cuenta con un backend propio para gestionar usuarios, autenticación y la lista personal de contenido.

---

## ✨ Funcionalidades

### 🎞️ Exploración de contenido

* Películas populares.
* Películas próximas a estrenarse.
* Películas mejor valoradas.
* Películas actualmente en cartelera.
* Series populares.
* Series emitidas actualmente.
* Series mejor valoradas.
* Navegación mediante carruseles horizontales.
* Contenido adaptado a dispositivos móviles y escritorio.

### 🔎 Búsqueda y listados

* Búsqueda de películas y series.
* Listados paginados.
* Infinite scroll mediante `IntersectionObserver`.
* Filtrado de resultados repetidos.
* Debounce de búsqueda para evitar solicitudes innecesarias.
* Estados de carga mediante skeletons.

### 🎬 Detalle de películas y series

Cada contenido dispone de una vista detallada con:

* Poster.
* Título.
* Sinopsis.
* Trailer de YouTube.
* Reparto principal.
* Plataformas disponibles en Chile.
* Opciones de streaming, compra o arriendo cuando están disponibles.
* Recomendaciones relacionadas.

En el caso de las series:

* Selector de temporadas.
* Información de episodios.
* Navegación por temporadas.

### 👤 Usuarios y autenticación

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante JWT.
* Validación periódica de la sesión.
* Cierre automático de sesión cuando el token deja de ser válido.

### ❤️ Mi lista

Los usuarios autenticados pueden:

* Agregar películas y series a su lista personal.
* Eliminar contenido de la lista.
* Mantener la lista sincronizada con el backend.
* Consultar su contenido guardado desde la sección **Mi Lista**.

### 📱 Diseño responsive

La interfaz se adapta a distintos tamaños de pantalla e incluye:

* Menú lateral para dispositivos móviles.
* Grillas adaptables.
* Carruseles horizontales.
* Skeleton loading.
* Diseño responsive para escritorio, tablet y móvil.

---

## 🛠️ Tecnologías utilizadas

| Tecnología   | Uso                               |
| ------------ | --------------------------------- |
| React        | Construcción de la interfaz       |
| TypeScript   | Tipado estático                   |
| Vite         | Desarrollo y build                |
| React Router | Navegación y rutas                |
| Zustand      | Estado global                     |
| Tailwind CSS | Estilos y diseño responsive       |
| TMDB API     | Información de películas y series |
| JWT          | Autenticación                     |
| REST API     | Comunicación con backend          |
| Vercel       | Despliegue                        |
| ESLint       | Calidad y validación del código   |

---

## 🏗️ Arquitectura

La aplicación está dividida principalmente en dos fuentes de información:

```text
                    ┌──────────────────────┐
                    │      Movie App       │
                    │   React + TypeScript │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌─────────────────┐          ┌──────────────────┐
       │     TMDB API    │          │  Backend propio  │
       │                 │          │                  │
       │ Películas       │          │ Usuarios         │
       │ Series          │          │ Autenticación    │
       │ Cast            │          │ JWT              │
       │ Trailers        │          │ Mi lista         │
       │ Streaming       │          │ Películas guard. │
       └─────────────────┘          └──────────────────┘
```

La aplicación consume directamente la API de TMDB para la información pública de películas y series, mientras que el backend propio gestiona las funcionalidades asociadas a usuarios y contenido guardado.

---

## 🌐 Integración con TMDB

La aplicación utiliza la API de **The Movie Database (TMDB)** para obtener información de películas y series.

Entre los datos consultados se encuentran:

* Películas.
* Series.
* Reparto.
* Temporadas.
* Episodios.
* Recomendaciones.
* Trailers.
* Plataformas de streaming.

La integración utiliza autenticación mediante Bearer Token, mecanismo soportado por la API de TMDB.

Las consultas se realizan desde hooks reutilizables para manejar:

* Estados de carga.
* Errores.
* Cancelación de solicitudes mediante `AbortController`.
* Paginación.
* Búsquedas.
* Consultas de detalle.
* Temporadas de series.

---

## 🔐 Autenticación

La aplicación utiliza un backend propio para gestionar las cuentas de usuario.

Flujo general:

```text
Usuario
   │
   ├── Registro ──────────► Backend
   │                           │
   │                           ▼
   │                        Usuario
   │
   └── Login ─────────────► Backend
                               │
                               ▼
                             JWT
                               │
                               ▼
                         Frontend React
                               │
                               ▼
                       Sesión autenticada
```

El token JWT se mantiene en el cliente y se utiliza para realizar las operaciones protegidas del backend.

Además, la aplicación valida periódicamente la sesión y elimina las credenciales locales cuando el token deja de ser válido.

---

## ❤️ Gestión de favoritos

El estado de favoritos se maneja mediante **Zustand**, utilizando persistencia en `localStorage`.

El flujo permite:

```text
Detalle de película/serie
          │
          ▼
     Agregar a lista
          │
          ├──────────────► Estado global Zustand
          │
          └──────────────► Backend
                              │
                              ▼
                       Lista del usuario
```

Esto permite mantener una experiencia fluida en la interfaz y sincronizar posteriormente los datos con el backend.

---

## 🧭 Rutas principales

| Ruta                         | Descripción                 |
| ---------------------------- | --------------------------- |
| `/`                          | Página principal            |
| `/:type/:id`                 | Detalle de película o serie |
| `/:typeMedia/list/:typeList` | Listado de contenido        |
| `/login`                     | Inicio de sesión            |
| `/create-account`            | Registro de usuario         |
| `/my-list`                   | Lista personal del usuario  |

La ruta `/my-list` requiere una sesión válida.

---

## 📂 Estructura principal

```text
src/
├── assets/
├── components/
│   ├── Card.tsx
│   ├── CardCarousel.tsx
│   ├── MovieCard.tsx
│   ├── InfiniteList.tsx
│   ├── InfiniteListWrapper.tsx
│   ├── MyList.tsx
│   └── Skeleton.tsx
│
├── hooks/
│   └── useFetch.ts
│
├── store/
│   └── useFavoritesStore.ts
│
├── types/
│   └── index.ts
│
├── auth/
│   ├── Login
│   └── CreateAccount
│
├── details/
│   └── MediaDetails
│
├── menu/
│
├── App.tsx
├── Layout.tsx
├── main.tsx
└── index.css
```

La estructura busca separar componentes reutilizables, lógica de acceso a datos, estado global y vistas específicas de autenticación y detalle.

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/SebastianDiaz97/movie_app_front.git
cd movie_app_front
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080
```

`VITE_API_URL` corresponde a la URL del backend utilizado por la aplicación.

> No se deben subir archivos `.env` con credenciales o configuraciones privadas al repositorio.

### 4. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

---

## 📜 Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run preview
```

Permite previsualizar la versión de producción.

```bash
npm run lint
```

Ejecuta ESLint para detectar problemas en el código.

---

## ☁️ Despliegue

El frontend está preparado para desplegarse en **Vercel**.

El proyecto incluye configuración mediante `vercel.json` para:

* Redirigir las peticiones `/api` hacia el backend.
* Mantener el funcionamiento de las rutas de la SPA.
* Servir correctamente la aplicación en producción.

---

## 🔒 Consideraciones de seguridad

La aplicación actualmente realiza determinadas consultas a TMDB desde el cliente.

Por este motivo, cualquier credencial utilizada directamente por el frontend debe considerarse accesible para el usuario final. Los tokens destinados a ser realmente secretos no deben almacenarse como parte del código ejecutado en el navegador.

Como mejora futura, las consultas que requieran credenciales privadas podrían pasar por el backend.

---

## 📌 Próximas mejoras

Algunas mejoras consideradas para futuras versiones:

* [ ] Centralizar las consultas a TMDB mediante el backend.
* [ ] Mejorar el manejo de errores de red.
* [ ] Agregar pruebas unitarias y de integración.
* [ ] Mejorar la estrategia de caché de contenido.
* [ ] Incorporar paginación o carga optimizada en más secciones.
* [ ] Mejorar la gestión de expiración de sesión.
* [ ] Agregar más información a las páginas de detalle.
* [ ] Optimizar aún más el rendimiento en dispositivos móviles.

---

## 👨‍💻 Autor

**Sebastián Díaz**

Ingeniero Civil en Informática.

Proyecto desarrollado como parte de mi portafolio personal para profundizar en el desarrollo frontend, consumo de APIs, manejo de estado, autenticación y comunicación con servicios backend.
