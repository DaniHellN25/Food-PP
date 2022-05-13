const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const {
  API_KEY
} = process.env;
const getAllrecipes = async (req, res, next) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({ include: Diet });
    if (api || db) {
      let apiResponse = api.data.results
        ?.map((recipe) => {
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
        })
        
      let wholeResponse = [...apiResponse, db];
      res.send(wholeResponse);
    }
  } catch (error) {
    console.error(error);
  };
};

const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({
      where: {
        name: name
      },
    });
    if (api || db) {
      let apiResponse = api.data.results?.filter((recipe) => {
          if (recipe.title.toLowerCase().includes(`${name.toLowerCase()}`))
            return recipe
        }).map((recipe) => {
          return {
            image: recipe.image,
            title: recipe.title,
            diets: recipe.diets.join(),
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
          };
        });
        console.log(apiResponse)
      let wholeResponse = [...apiResponse, db];
      res.send(wholeResponse);
    } 
  } catch (error) {
    console.error(error);
  }
};
const getRecipeById = async (req, res, next) => {
  const {id} = req.params
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const {data} = api
    const db = await Recipe.findAll({ where: {
    id: id,} , include: Diet });
    if (api || db) {
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
      let wholeResponse = [apiResponse];
      res.send(wholeResponse);
    }
  } catch (error) {
    console.error(error);
  };
};
module.exports = {
  getAllrecipes,
  getRecipeByName,
  getRecipeById
};
// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso