const { Recipe,Diet, Recipe_Diet} = require("../db.js");

const createRecipe = async (req, res) => {
  const {title, summary, spoonacularScore, healthScore, image, analyzedInstructions, diets} = req.body
  console.log(diets)
  let find = await Diet.findByPk(diets)
   console.log(find)
  try {
    let newRecipe = await Recipe.findOrCreate({
      where: {
        title: title,
        summary: summary,
        spoonacularScore: spoonacularScore,
        healthScore: healthScore,
        image: image,
        analyzedInstructions: analyzedInstructions,
        ownRecipe: true
      }
  }) 
  await newRecipe.addDiet(find, { through: Recipe_Diet});
   return res.send(newRecipe)
  } catch (error) {
    console.error(error)
    // res.status(400).send(`Missing parameters 🕵️‍♂️`);
  }
};
//
module.exports = {
  createRecipe
};