const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db.js");

const createRecipe = (req, res, next) => {
  const {
    title,
    summary,
    spoonacularScore,
    healthScore,
    image,
    analyzedInstructions,
    diets,
  } = req.body;
  let newRecipe, foundTypes;
  Recipe.findOrCreate({
    where: {
      title,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
      ownRecipe: true,
    },
  })
    .then((created) => {
      newRecipe = created[0];
      return Diet.findAll({ where: { id: { [Op.or]: diets } } });
    })
    .then((found) => {
      foundTypes = found;
      newRecipe.addDiets(foundTypes);
      return newRecipe;
    })
    .then((newRecipe) => res.send(newRecipe))
    .catch((error) => next(error));
};

//
module.exports = {
  createRecipe,
};
