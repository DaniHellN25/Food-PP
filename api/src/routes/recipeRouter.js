const { Router } = require('express');
const { getAllrecipes, getRecipeByName } = require('../controllers/recipesController.js');

const recipeRouter = Router();

// Configurar los routers

recipeRouter.get('/getRecipes', getAllrecipes)
recipeRouter.get('/', getRecipeByName)
// Ejemplo: router.use('/auth', authRouter);


module.exports = recipeRouter;

// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados