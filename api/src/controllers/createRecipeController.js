const { Op } = require("sequelize");
const { Recipe,Diet} = require("../db.js");


const createRecipe = async (req, res) => {
  const {title, summary, spoonacularScore, healthScore, image, analyzedInstructions, diets} = req.body
  let foundTypes=await Diet.findAll({where:{ id:{[Op.or]: diets}}})
  try {
    let [newRecipe, created] = await Recipe.findOrCreate({
      where: {
        title,
        summary,
        spoonacularScore,
        healthScore,
        image,
        analyzedInstructions,
        ownRecipe: true
      }
  }) 
  await newRecipe.addDiets(foundTypes)
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
// async () => {
//   const p1Character = Character.create({code: 'ONE', name: 'First', hp: 90.0, mana: 150.0, race: 'Human', age: 27});
//   const p2Character = Character.create({code: 'TWO', name: 'Second', hp: 135.0, mana: 40.0, race: 'Machine', age: 20});
//   const p3Character = Character.create({code: 'THREE', name: 'Third', hp: 110.0, mana: 110.0, race: 'Human', age: 23});
//   const [p1, p2, p3] = await Promise.all([p1Character, p2Character, p3Character]);
//   await Promise.all([
//     p1.createRole({name: 'Tank'}),
//     p1.createRole({name: 'Top'}),
//     p2.createRole({name: 'Jungle'}),
//     p3.createRole({name: 'Mid'}),
//     p3.createRole({name: 'Support'})
//   ]);
// })