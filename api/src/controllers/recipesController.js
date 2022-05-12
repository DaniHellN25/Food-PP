const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const db = require("../db.js");
const apiKey = "c7455b854ded44eab1a19b368e2df2a8";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getAllrecipes = async (req, res, next) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({ include: Diet });
    if (api || db) {
      let apiResponse = api.data.results
        ?.map((recipe) => {
          return {
            name: recipe.title,
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
  }
  next();
};

const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (api || db) {
      let apiResponse = api.data.results
        ?.filter((recipe) => {
          if (recipe.title.toLowerCase().includes(`${name.toLowerCase()}`))
            return {
              recipe,
            }
        })
        .map((recipe) => {
          return {
            image: recipe.image,
            name: recipe.title,
            diets: recipe.diets.join(),
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
          };
        });
      let wholeResponse = [...apiResponse, db];
      res.send(wholeResponse);
    } 
  } catch (error) {
    console.error(
      `It seems there's no recipe yet, you might like to become a Chef and add a new recipe for all the folks out there 👨‍🍳👩‍🍳`
    );
  }
};
module.exports = {
  getAllrecipes,
  getRecipeByName,
};
