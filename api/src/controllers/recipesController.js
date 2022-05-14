const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize")
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

      let wholeResponse = [...apiResponse, ...db];
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
  const lower = name.toLowerCase()
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({
      where: {
        title: {[Op.substring]: lower,}
      },
    });
    if (api || db) {
      let apiResponse = api.data.results.filter((recipe) => {
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
      let wholeResponse = [...apiResponse, ...db];
      console.log(wholeResponse.length)
      if(wholeResponse.length > 0) return res.send(wholeResponse);
    }
  } catch (error) {
    return res
    .status(404)
    .send(
      `It seems we don't have recipes that meets your expectations, you may want to become a Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
    );
  }
};
//id for testing(716426)
const getRecipeById = async (req, res, ) => {
  const { id } = req.params;
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  try {
    if (
      regexExp.test(id)
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
    // return res
    //   .status(404)
    //   .send(
    //     `It seems we don't have that recipe yet... But you may want to become a Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
    //   );
    console.error(error)
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
