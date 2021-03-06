const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipeRouter.js')
const diets = require('./dietRouter.js')
const create = require('./createRecipeRouter.js')

const router = Router();


// Configurar los routers
router.use('/recipes', recipes)
router.use('/types', diets)
router.use('/recipe', create)

// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
