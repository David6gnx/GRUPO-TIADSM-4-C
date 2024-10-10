// Para correr en terminal: node [Nombre del archivo].
// id: Parametro Dinámico
// =>: Es un arrow function, es decir, un paso de parametros (Devolución de valores dentro de las variables (const) declaradas).

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// El siguiente es el enlace, la comunicación hacia el servidor.
app.get('/api/greet', (req,res)=>{
	res.json({message: 'Esta es la primer API!'});
})

// Inicia el servidor
app.listen(PORT,() =>{
    console.log('Servidor corriendo en http://localhost:$PORT');
})

app.use(express.json()); // Solicitudes que vengan en formato json.
let estudiantes=[ // Estamos creando listas en formato de arreglo. Estamos declarando una base de datos temporal (llamada estudiantes)
    { id:1,nombre:'José Esparza' }, // Son arreglos.
    { id:2,nombre:'Mónica Gómez' },
    { id:3,nombre:'Juan Ruiz' },
];

// GET: Obtener todos los estudiantes
// Con el res estamos creando una respuesta a la petición de estudiantes.
// Estamos haciendo un llamado a todos nuestros estudiantes.
app.get('/estudiantes', (req,res)=>{ // Estamos definiendo una ruta a estudiantes. Cuando haga una solicitud get a esta ruta el servidor regresara todos los estudiantes.
    res.json(estudiantes); // La respuesta.
});

// Get: Obtener un estudiante por ID.
// parseInt (Palabra reservada) sirve para convertir un dato de texto en númerico.
app.get('/estudiantes/:id', (req,res)=>{ // Estamos definiendo una ruta con el id.
    const id=parseInt(req.params.id) // Convertimos el parametro id a un número entero.
    const estudiante = estudiantes.find(e=> e.id===id); // Estamos haciendo una busqueda al id del estudiante por el arreglo. 
    if (estudiante) {
        res.json(estudiante);
    } else {
        res.status(404).send ('Estudiante no encontrado');
    }
});

//POST Estamos creando el siguiente metodo: Crear un nuevo estudiante por POST
app.post('/estudiantes', (req,res)=>{ // Estamos definiendo una ruta para crear un estudiante en el arreglo estudiantes.
    const nuevoEstudiante={ // Creamos una variable
        id:estudiantes.length+1,
        nombre:req.body.nombre // En el body voy a observar como se hace la actualizacion en el postman.
    };
    estudiantes.push(nuevoEstudiante); // Estamos agregando un nuevo estudiante en mi arreglo estudiantes. Push (Agregar)
    res.status(201).json(nuevoEstudiante); // 
});

// Método PUT Sintaxis - Actualizar un estudiante existente por ID.
app.put('/estudiantes/:id', (req, res) => { // Estamos definiendo una ruta put que nos permite actualizar un estudiante. El parametro dinamico es el id. request=requerimiento 
    const id=parseInt(req.params.id); // Define la variable id para hacer la busqueda y localizar lo que se busca.
    const estudiante=estudiantes.find(e=>e.id===id); // Busca si el id esta en la lista de estudiantes.
    if (estudiante) {
        estudiante.nombre=req.body.nombre; // Si el estudiante fue encontrado actualiza el nombre del estudiante.
        res.json(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado'); // Si no lo encuentra envia un error.
    }
});

// DELETE. Eliminar un item por id
app.delete('/estudiantes/:id', (req,res) => { // Define una ruta para eliminar a un estudiante por su iod.
    const id=parseInt(req.params.id); // Define la variable id 
    const index=estudiantes.findIndex(e=>e.id===id); // Busca al estudiante en el arreglo de los estudiantes.
    if (index!==-1) {
        estudiantes.splice(index,1); // Si el estudiante fue encontrado, elimina el nombre del estudiante.
        res.send('Estudiante Eliminado');
    } else {
        res.status(404).send('Estudiante No Encontrado');
    }
});