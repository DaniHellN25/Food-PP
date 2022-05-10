const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const createRecipe = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = createRecipe;

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos