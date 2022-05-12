const { Router } = require('express');
const { getTypes } = require('../controllers/dietController.js');


const dietRouter = Router();

// Configurar los routers
dietRouter.get('/', getTypes)
// Ejemplo: router.use('/auth', authRouter);


module.exports = dietRouter;

// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá