# LibreríaSPA

Proyecto de una SPA (Single Page Application) para una librería en línea con un frontend en React/Vite y una API en FastAPI.

## ¿Qué hace esta SPA?

La aplicación muestra un catálogo de libros usando datos que entrega la API. El usuario puede ver la lista de libros y realizar compras o pedidos que se guardan localmente en el navegador con `LocalStorage`.

Además, la app incluye una sección de frases (quotes) como parte de la experiencia. Por ahora las frases se muestran de forma estática, pero está planeado implementar otra API para manejarlas más adelante.

## Estructura del proyecto

- `api/` — servidor en FastAPI que expone datos de libros.
- `frontend/` — aplicación en React con Vite para la interfaz de usuario.

## Cómo correr la API

1. Abre una terminal.
2. Ve a la carpeta `api`:

```bash
cd api
```

3. Instala dependencias:

```bash
pip install -r requirements.txt
```

4. Inicia el servidor:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

5. Verifica que la API funcione en:

- `http://127.0.0.1:8000/api/libros`
- Documentación automática en `http://127.0.0.1:8000/docs`

## Cómo correr el frontend

1. Abre otra terminal.
2. Ve a la carpeta `frontend`:

```bash
cd frontend
```

3. Instala dependencias:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre la URL que muestre Vite en la terminal (normalmente `http://localhost:5173`).

## Notas importantes

- El frontend espera consumir la API de libros para mostrar el catálogo.
- El carrito/ventas se gestiona localmente con `LocalStorage`.
- La funcionalidad de quotes está integrada en la interfaz, y se planea reemplazarla o mejorarla usando una API dedicada más adelante.
