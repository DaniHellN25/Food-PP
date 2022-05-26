const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6} = process.env;

const { Op } = require("sequelize");
function removeTags(str){
  return str.replace(/<[^>]*>/g, ' ')
               .replace(/\s{2,}/g, ' ')
               .trim();}

const getAllrecipes = async (req, res, next) => {
  if (req.query.name) return next();
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const db = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let filterDB = db.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        diets: recipe.diets
          .map((type) => {
            return type.name;
          })
          .join().replace(/,/g, ', '),
        spoonacularScore: recipe.spoonacularScore,
        healthScore: recipe.healthScore,
      };
    });
    if (api || db) {
      let apiResponse = api.data.results?.map((recipe) => {
        return {
          // vegetarian: recipe.vegetarian,
          // vegan: recipe.vegan,
          // glutenFree: recipe.glutenFree,
          id: recipe.id,
          image: recipe.image,
          title: recipe.title,
          diets: recipe.diets.map((e)=> e.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")).join().replace(/,/g, ', '),
          dishTypes: recipe.dishTypes.map((e)=> e.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")).join().replace(/,/g, ', '),
          // summary: removeTags(recipe.summary),
          spoonacularScore: recipe.spoonacularScore,
          healthScore: recipe.healthScore,
        };
      });

      let wholeResponse = [...apiResponse, ...filterDB];
      res.send(wholeResponse);
    }
  } catch (error) {
    console.error(error)
    // return res
    //   .status(404).send(
    //     // `We might have a problem in the kitchen  👩‍🍳👨‍🍳, we offer you our most sincere apologies.  We like you, have a cupcake🧁`
    //     error
    //   );
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
          [Op.iLike]: `%${lowerCaseQueryName}%`,
        },
      },
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let filterDB = db.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        diets: recipe.diets
          .map((type) => {
            return type.name;
          })
          .join().replace(/,/g, ', '),
        // summary: recipe.summary,
        spoonacularScore: recipe.spoonacularScore,
        healthScore: recipe.healthScore,
      };
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
            // vegetarian: recipe.vegetarian,
            // vegan: recipe.vegan,
            // glutenFree: recipe.glutenFree,
            id: recipe.id,
            image: recipe.image,
            title: recipe.title,
            diets: recipe.diets.map((e)=> e.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1))
            .join(" ")).join().replace(/,/g, ', '),
            dishTypes: recipe.dishTypes.map((e)=> e.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")).join().replace(/,/g, ', '),
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
          };
        });
      if (!apiResponse.length && !filterDB.length)
        return res
          .status(404)
          .send(
            `It seems we don't have recipes that meets your expectations, you may want to become a Chef and create it for all the folks out there 😉👩‍🍳👨‍🍳`
          );
      else {
        let wholeResponse = [...apiResponse, ...filterDB];
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
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let filterDB = db.map((recipe) => {
        return {
          id: recipe.id,
          image: recipe.image,
          title: recipe.title,
          diets: recipe.diets
            .map((type) => {
              return type.name;
            })
            .join().replace(/,/g, ', '),
          analyzedInstructions: recipe.analyzedInstructions,
          summary: recipe.summary,
          spoonacularScore: recipe.spoonacularScore,
          healthScore: recipe.healthScore,
          ownRecipe: recipe.ownRecipe,
        };
      })
      filterDB.length
        ? res.send(filterDB[0])
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
          vegetarian: data.vegetarian,
          vegan: data.vegan,
          glutenFree: data.glutenFree,
          image: data.image,
          id: data.id,
          title: data.title,
          dishTypes: data.dishTypes.map((e)=> e.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")).join().replace(/,/g, ', '),
          diets: data.diets.map((e)=> e.split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")).join().replace(/,/g, ', '),
          summary: removeTags(data.summary),
          spoonacularScore: data.spoonacularScore,
          healthScore: data.healthScore,
          analyzedInstructions: data.analyzedInstructions[0]?.steps
            .map((step) => {
              return `${step.number}.  ${step.step}`;
            })
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
