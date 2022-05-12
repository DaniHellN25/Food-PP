const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const db = require("../db.js");
const apiKey = "c7455b854ded44eab1a19b368e2df2a8";
const Sequelize = require("sequelize");
const e = require("express");
const Op = Sequelize.Op;

//falta
const getTypes = async (req, res) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
    );
    if (api) {
      let apiResponseTypes = [];
      api.data.results
        ?.map((recipe) => {
          return {
            diets: recipe.diets,
          };
        })
        .forEach((e) => {
          return e.diets.forEach((type) => {
            if (!apiResponseTypes.includes(type)) {
              apiResponseTypes.push(type);
            }
          });
        });
      apiResponseTypes.forEach(async (e) => {
        await Diet.findOrCreate({
          where: {
            name: e
              .split(" ")
              .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
              .join(" "),
          },
        });
      });
      const db = await Diet.findAll();
      return res.send(db);
    }
  } catch (error) {
    console.error(`Nothing to see here 🕵️‍♂️`);
  }
};

module.exports = {
  getTypes,
};
