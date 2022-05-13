const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const getAllrecipes = async (req, res,) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({ include: Diet });
    if (api || db) {
      let apiResponse = api.data.results?.map((recipe) => {
        return {
          title: recipe.title,
          summary: recipe.summary,
          spoonacularScore: recipe.spoonacularScore,
          healthScore: recipe.healthScore,
          image: recipe.image,
          analyzedInstructions: recipe.analyzedInstructions[0]?.steps
            .map((step) => {
              return `${step.number}.  ${step.step}`;
            })
            .join(),
          diets: recipe.diets.join(),
          dishTypes: recipe.dishTypes.join(),
        };
      });

      let wholeResponse = [...apiResponse, db];
      res.send(wholeResponse);
    }
  } catch (error) {
    return res
    .status(404)
    .send(
      `We might have a problem in the kitchen  👩‍🍳👨‍🍳, we offer you our most sincere apologies.  We like you, have a cupcake🧁`
    );
  }
};
//You need to fix to get error when the query is not found
const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({
      where: {
        title: name,
      },
    });
    if (api || db) {
      let apiResponse = api.data.results
        ?.filter((recipe) => {
          if (recipe.title.toLowerCase().includes(`${name.toLowerCase()}`))
            return recipe;
        })
        .map((recipe) => {
          return {
            image: recipe.image,
            title: recipe.title,
            diets: recipe.diets.join(),
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
          };
        });
      let wholeResponse = [...apiResponse, db];
      res.send(wholeResponse);
    }
  } catch (error) {
    return res
    .status(404)
    .send(
      `It seems we don't have recipes that meet your expectations, you may want to become Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
    );
  }
};
const getRecipeById = async (req, res, ) => {
  const { id } = req.params;
  try {
    if (
      id ===
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    ) {
      const db = await Recipe.findAll({
        where: {
          id: id,
        },
        include: Diet,
      });
      return res.send(db);
    } else {
      const api = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const { data } = api;
      let apiResponse = (() => {
        return {
          image: data.image,
          title: data.title,
          dishTypes: data.dishTypes.join(),
          diets: data.diets.join(),
          summary: data.summary,
          spoonacularScore: data.spoonacularScore,
          healthScore: data.healthScore,
          analyzedInstructions: data.analyzedInstructions[0]?.steps
            .map((step) => {
              return `${step.number}.  ${step.step}`;
            })
            .join(),
        };
      })(data);
      return res.send(apiResponse);
    }
  } catch (error) {
    return res
      .status(404)
      .send(
        `It seems we don't have that recipe yet, you may want to become Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
      );
  }
};
module.exports = {
  getAllrecipes,
  getRecipeByName,
  getRecipeById,
};
// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso
