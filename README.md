# LibreríaSPA

Proyecto de una SPA (Single Page Application) para una librería en línea con un frontend en React/Vite. El frontend consume datos de libros desde una API y gestiona el estado del carrito y favoritos en el navegador.

## Descripción del frontend

La aplicación se divide en las siguientes partes principales:

- `src/main.jsx` — arranca la aplicación, envuelve la app con los providers de `Favorites` y `Cart` y monta el enrutador de React Router.
- `src/App.jsx` — es el layout general. Contiene el header con la navegación y el selector de tema claro/oscuro. Renderiza las páginas de `Todos los libros` y `Mis libros`, y monta el componente `Cart` en la barra lateral.
- `src/pages/AllBooks.jsx` — carga el catálogo de libros desde `/api/libros` usando `fetch`. Maneja los estados de carga y error, y muestra la lista de libros con `BookCard`.
- `src/pages/MyBooks.jsx` — muestra los libros marcados como favoritos. También carga los mismos datos de la API y usa el estado de favoritos para filtrar la lista.
- `src/components/BookCard.jsx` — representa cada libro con su título y autor. Permite marcar o desmarcar favoritos y agregar el libro al carrito.
- `src/components/Cart.jsx` — muestra los items agregados al carrito, permite eliminar unidades, limpiar el carrito y solicitar una cotización local.

## Flujo de datos y estado

1. Cuando la página de `Todos los libros` se monta, `AllBooks.jsx` llama a `/api/libros`.
2. Durante la petición se muestra `Cargando libros...`.
3. Si la petición falla, se muestra un mensaje de error en pantalla.
4. Si la petición es exitosa, la lista de libros aparece como tarjetas individuales.
5. Desde cada tarjeta se puede:
   - agregar o quitar un libro de los favoritos,
   - añadir un libro al carrito.
6. El carrito se muestra siempre en la barra lateral con los libros seleccionados.

## LocalStorage y persistencia

El frontend guarda datos en `localStorage` para mantener el estado entre recargas:

- `tienda:cart` — almacena los items del carrito.
- `tienda:favorites` — almacena los IDs de los libros favoritos.
- `tienda:theme` — almacena el tema seleccionado (`light` o `dark`).

De esta forma, cuando el usuario refresca la página, conserva:

- los libros en el carrito,
- los libros marcados como favoritos,
- el modo claro u oscuro seleccionado.

## Manejo de favoritos

La lógica de favoritos está en `src/utils/useFavorites.jsx`:

- Un contexto de React (`FavoritesContext`) proporciona los favoritos y una función `toggle`.
- `toggle(id)` alterna el estado del libro en la lista de favoritos.
- El estado se sincroniza con `localStorage` cada vez que cambia.

## Manejo del carrito

La lógica del carrito está en `src/utils/cart.jsx`:

- Un contexto de React (`CartContext`) expone los items del carrito y las acciones `add`, `remove` y `clear`.
- Cada libro agregado se guarda en `localStorage`.
- El componente `Cart` lee los items y permite gestionar el carrito desde la interfaz.

## Tema claro/oscuro

El selector de tema está en `src/App.jsx` y usa el atributo `data-theme` en el elemento `html`.

- El botón alterna entre `Modo oscuro` y `Modo claro`.
- La selección se guarda en `localStorage` con la clave `tienda:theme`.
- Los estilos de `src/styles.css` definen variables CSS distintas para tema claro y oscuro.

## Estructura de archivos relevante

- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/pages/AllBooks.jsx`
- `frontend/src/pages/MyBooks.jsx`
- `frontend/src/components/BookCard.jsx`
- `frontend/src/components/Cart.jsx`
- `frontend/src/utils/cart.jsx`
- `frontend/src/utils/useFavorites.jsx`
- `frontend/src/styles.css`

## Cómo correr solo el frontend

1. Abre una terminal.
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

5. Abre la URL que muestre Vite en la terminal, normalmente `http://localhost:5173`.

## Nota

El README enfatiza el funcionamiento del SPA, su estado local y la persistencia. La parte de la API no se detalla en este documento, porque el foco es el frontend y su lógica interna.
