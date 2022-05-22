const { Router } = require('express');
const { createRecipe } = require('../controllers/createRecipeController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const createRecipeRouter = Router();

// Configurar los routers
createRecipeRouter.post('/', createRecipe)
// Ejemplo: router.use('/auth', authRouter);


module.exports = createRecipeRouter;

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos