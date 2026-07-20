# API — Catálogo de la tienda de libros

**Alumno:** Ingo Sebastián Guzmán Brandt  ·  **Sección:** C1
**Tema:** Libros

API asignada por el docente para la **Evaluación 3 (UA3)**. Tu frontend en React debe
**consumir** esta API con `fetch` o `axios`, mostrando los estados de ⏳ carga, ✅ datos y ❌ error.

## Endpoint

- `GET /api/libros` → lista todos los registros (`{ total, libros: [...] }`)
- `GET /api/libros/{id}` → un registro por id

## Cómo la usarás en el frontend

GET /api/libros muestra el catálogo; el CRUD (LocalStorage) registra ventas seleccionando libros.

> Tu **CRUD con Local Storage** (Ventas / pedidos) es lo que tú administras (crear/editar/eliminar).
> La **API** entrega datos de referencia que muestras y usas para llenar los selectores del formulario.

## Cómo correr la API

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Prueba: <http://127.0.0.1:8000/api/libros>  ·  Docs: <http://127.0.0.1:8000/docs>

## Cómo consumirla desde React (ejemplo)

```javascript
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/libros")
    .then((res) => {
      if (!res.ok) throw new Error("Error " + res.status)
      return res.json()
    })
    .then((data) => setDatos(data.libros))   // ✅ datos
    .catch((err) => setError(err.message))        // ❌ error
    .finally(() => setCargando(false))            // fin de ⏳ carga
}, [])
```
