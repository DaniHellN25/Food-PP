const { Diet } = require("../db.js");
const axios = require("axios");
const {
  API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6
} = process.env;

//mapeo todos los resultaos de la busqueda para obtener solo los tipo de dieta de cada uno, obtengo un arreglo de objetos y por cada  elemento en la propiedad diets checo si estan en mi var para pushearlos. Ya filtradas solo queda checar si estan en la BD o crearlos
const getTypes = async (req, res, next) => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=40`
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
      let [typeCreated,succeful] = await Diet.findOrCreate({
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
    next(error)
  }
};
//Creo la base de datos para Diets, cuando se levanta el back se crean usando la función en el index
const createInitialTypes = async (req, res, next) => {
  try {
    await Diet.bulkCreate([
      { name: 'Gluten Free' ,
        description: 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).'  
    },
      { name: 'Ketogenic',
    
    description: 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.'
    },
      { name: 'Vegetarian',
    
    description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin.'
    },
      { name: 'Lacto Vegetarian',
    
    description: 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.'
    },
      { name: 'Ovo Vegetarian',
    
    description: 'All ingredients must be vegetarian and none of the ingredients can be or contain dairy.'
    },
      { name: 'Vegan',
    
    description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.'
    },
      { name: 'Pescetarian',
    
    description: 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not."'
    },
      { name: 'Paleo',
    
    description: 'Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.'
    },
      { name: 'Primal',
    
    description: 'Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.'
    },
      { name: 'Low FODMAP',
    
    description: 'FODMAP stands for \"fermentable oligo-, di-, mono-saccharides and polyols\". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products).'
    },
      { name: 'Whole 30',
    
    description: 'Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.'
    },
    ]);
  } catch (error) {
    next(error)
  }
}
module.exports = {
  getTypes,
  createInitialTypes
};
