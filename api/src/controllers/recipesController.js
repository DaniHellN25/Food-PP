const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const getAllrecipes = async (req, res, next) => {
  if (req.query.name) return next();
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({ include: Diet });
    if (api || db) {
      let apiResponse = api.data.results?.map((recipe) => {
        return {
          id: recipe.id,
          image: recipe.image,
          title: recipe.title,
          diets: recipe.diets.join(),
          dishTypes: recipe.dishTypes.join(),
          summary: recipe.summary,
          spoonacularScore: recipe.spoonacularScore,
          healthScore: recipe.healthScore,
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

const getRecipeByName = async (req, res, next) => {
  const { name } = req.query;
  const lowerCaseQueryName = name.toLowerCase();
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({
      where: {
        title: {
          [Op.or]: {
            [Op.eq]: lowerCaseQueryName,
            [Op.substring]: lowerCaseQueryName,
          },
        },
      },
      include: Diet,
    });
    if (api || db) {
      let apiResponse = api.data.results
        ?.filter((recipe) => {
          if (
            recipe.title.toLowerCase() === lowerCaseQueryName ||
            recipe.title.toLowerCase().includes(lowerCaseQueryName)
          )
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
      if (!apiResponse.length && !db.length)
        return res
          .status(404)
          .send(
            `It seems we don't have recipes that meets your expectations, you may want to become a Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
          );
      else {
        let wholeResponse = [...apiResponse, ...db];
        return res.send(wholeResponse);
      }
    }
  } catch (error) {
    next(error);
  }
};
//id for testing(716426)
const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const regexExpUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const regexExpNum = (num) => /^\d+$/.test(num);
  try {
    if (regexExpUUID.test(id)) {
      const db = await Recipe.findAll({
        where: {
          id: id,
        },
        include: Diet,
      });
      db.length
        ? res.send(db)
        : res.send(
            `It seems we don't have that recipe yet... But you may want to become a Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
          );
    } else if (regexExpNum(id)) {
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
    } else {
      res.send(
        `Invalid ID request 😅, we suggest you to try with numbers for Spoonacular's recipes 🧐 or with UUID format for created recipes. Here,  have a cupcake meanwhile 🧁.`
      );
    }
  } catch (error) {
    next(error);
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
