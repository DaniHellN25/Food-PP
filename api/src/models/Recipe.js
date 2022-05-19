const { DataTypes, UUID } = require("sequelize");
const { v4 } = require ('uuid')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.FLOAT,
      
    },
    healthScore: {
      type: DataTypes.FLOAT,
      
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: 'https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      
    },
    analyzedInstructions: {
      type: DataTypes.TEXT,
      
    },
    ownRecipe:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  },
  { timestamps: false });
};
