"""
API: Catálogo de la tienda de libros
Alumno: Ingo Sebastián Guzmán Brandt  ·  Sección: C1  ·  Libros
Proyecto EV3 (UA3) — API asignada por el docente.

Ejecutar:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000

Endpoint principal:  GET /api/libros
Documentación:       http://127.0.0.1:8000/docs
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Catálogo de la tienda de libros")

# CORS abierto para que el frontend (React/Vite) pueda consumir la API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# "Base de datos" en memoria (arreglo de objetos).
DATOS = [
    {'id': 1,
     'nombre': 'Cien años de soledad',
     'autor': 'G. García Márquez',
     'genero': 'Novela',
     'precio': 14990,
     'disponible': True,
     'imagen': 'https://placehold.co/400x300?text=Libro'},
    {'id': 2,
     'nombre': 'El principito',
     'autor': 'A. de Saint-Exupéry',
     'genero': 'Infantil',
     'precio': 8990,
     'disponible': True,
     'imagen': 'https://placehold.co/400x300?text=Libro'},
    {'id': 3,
     'nombre': '1984',
     'autor': 'George Orwell',
     'genero': 'Distopía',
     'precio': 11990,
     'disponible': True,
     'imagen': 'https://placehold.co/400x300?text=Libro'},
    {'id': 4,
     'nombre': 'La sombra del viento',
     'autor': 'C. Ruiz Zafón',
     'genero': 'Misterio',
     'precio': 13990,
     'disponible': True,
     'imagen': 'https://placehold.co/400x300?text=Libro'},
    {'id': 5,
     'nombre': 'Sapiens',
     'autor': 'Y. N. Harari',
     'genero': 'Ensayo',
     'precio': 16990,
     'disponible': False,
     'imagen': 'https://placehold.co/400x300?text=Libro'}
]

# Additional real book entries (ids 6..75)
additional_books = [
("Don Quijote de la Mancha", "Miguel de Cervantes", "Clásico"),
("Hamlet", "William Shakespeare", "Teatro"),
("Madame Bovary", "Gustave Flaubert", "Novela"),
("Crimen y castigo", "Fiódor Dostoyevski", "Novela"),
("Orgullo y prejuicio", "Jane Austen", "Romance"),
("Matar a un ruiseñor", "Harper Lee", "Ficción"),
("El gran Gatsby", "F. Scott Fitzgerald", "Ficción"),
("En busca del tiempo perdido", "Marcel Proust", "Novela"),
("La Odisea", "Homero", "Épica"),
("La Iliada", "Homero", "Épica"),
("Fahrenheit 451", "Ray Bradbury", "Ciencia ficción"),
("Brave New World", "Aldous Huxley", "Ciencia ficción"),
("El señor de los anillos", "J.R.R. Tolkien", "Fantasía"),
("Harry Potter y la piedra filosofal", "J.K. Rowling", "Fantasía"),
("El nombre de la rosa", "Umberto Eco", "Misterio"),
("Cumbres borrascosas", "Emily Brontë", "Romance"),
("Anna Karenina", "León Tolstói", "Novela"),
("Los miserables", "Victor Hugo", "Novela"),
("El código Da Vinci", "Dan Brown", "Misterio"),
("El alquimista", "Paulo Coelho", "Ficción"),
("Siddhartha", "Hermann Hesse", "Filosofía"),
("El Principito", "Antoine de Saint-Exupéry", "Infantil"),
("La metamorfosis", "Franz Kafka", "Novela"),
("Drácula", "Bram Stoker", "Terror"),
("Frankenstein", "Mary Shelley", "Terror"),
("Los hermanos Karamazov", "Fiódor Dostoyevski", "Novela"),
("El retrato de Dorian Gray", "Oscar Wilde", "Ficción"),
("El guardián entre el centeno", "J.D. Salinger", "Ficción"),
("La carretera", "Cormac McCarthy", "Ficción"),
("Beloved", "Toni Morrison", "Ficción"),
("El poder del ahora", "Eckhart Tolle", "Autoayuda"),
("Thinking, Fast and Slow", "Daniel Kahneman", "Psicología"),
("Homo Deus", "Yuval Noah Harari", "Ensayo"),
("Quiet", "Susan Cain", "Psicología"),
("Blink", "Malcolm Gladwell", "Ensayo"),
("The Pragmatic Programmer", "Andrew Hunt & David Thomas", "Tecnología"),
("Clean Code", "Robert C. Martin", "Tecnología"),
("The Lean Startup", "Eric Ries", "Negocios"),
("Sapiens", "Yuval Noah Harari", "Historia"),
("Guns, Germs, and Steel", "Jared Diamond", "Historia"),
("A Brief History of Time", "Stephen Hawking", "Ciencia"),
("The Selfish Gene", "Richard Dawkins", "Ciencia"),
("The Catcher in the Rye", "J.D. Salinger", "Ficción"),
("One Hundred Years of Solitude", "Gabriel García Márquez", "Novela"),
("Love in the Time of Cholera", "Gabriel García Márquez", "Novela"),
("The Hobbit", "J.R.R. Tolkien", "Fantasía"),
("The Chronicles of Narnia", "C.S. Lewis", "Fantasía"),
("The Kite Runner", "Khaled Hosseini", "Ficción"),
("A Thousand Splendid Suns", "Khaled Hosseini", "Ficción"),
("Memoirs of a Geisha", "Arthur Golden", "Ficción"),
("The Girl with the Dragon Tattoo", "Stieg Larsson", "Misterio"),
("The Da Vinci Code", "Dan Brown", "Misterio"),
("Life of Pi", "Yann Martel", "Ficción"),
("The Road", "Cormac McCarthy", "Ficción"),
("The Handmaid's Tale", "Margaret Atwood", "Dystopía"),
("The Bell Jar", "Sylvia Plath", "Ficción"),
("Norwegian Wood", "Haruki Murakami", "Ficción"),
("Kafka on the Shore", "Haruki Murakami", "Fantasía"),
("The Wind-Up Bird Chronicle", "Haruki Murakami", "Ficción"),
("On the Road", "Jack Kerouac", "Ficción"),
("Catch-22", "Joseph Heller", "Ficción"),
("Slaughterhouse-Five", "Kurt Vonnegut", "Ficción"),
("The Stranger", "Albert Camus", "Filosofía"),
("The Little Prince", "Antoine de Saint-Exupéry", "Infantil"),
("The Sun Also Rises", "Ernest Hemingway", "Ficción"),
("For Whom the Bell Tolls", "Ernest Hemingway", "Ficción"),
("A Farewell to Arms", "Ernest Hemingway", "Ficción"),
("The Grapes of Wrath", "John Steinbeck", "Ficción"),
("Of Mice and Men", "John Steinbeck", "Ficción"),
("The Color Purple", "Alice Walker", "Ficción"),
("Their Eyes Were Watching God", "Zora Neale Hurston", "Ficción"),
("The Alchemist", "Paulo Coelho", "Ficción"),
("The Old Man and the Sea", "Ernest Hemingway", "Ficción"),
]

for idx, (nombre, autor, genero) in enumerate(additional_books, start=6):
    DATOS.append({
        'id': idx,
        'nombre': nombre if isinstance(nombre, str) else str(nombre),
        'autor': autor,
        'genero': genero,
        'precio': 9900 + (idx * 150) % 8000,
        'disponible': False if (idx % 11 == 0) else True,
        'imagen': 'https://placehold.co/400x300?text=Libro'
    })


@app.get("/")
def inicio():
    return {
        "mensaje": "API Catálogo de la tienda de libros",
        "endpoint": "GET /api/libros",
        "docs": "/docs",
    }


@app.get("/api/libros")
def listar():
    """Devuelve el JSON con todos los registros."""
    return {"total": len(DATOS), "libros": DATOS}


@app.get("/api/libros/{item_id}")
def obtener(item_id: int):
    """Devuelve un registro por su id (404 si no existe)."""
    for item in DATOS:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="No encontrado")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
