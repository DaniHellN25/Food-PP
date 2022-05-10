const { DataTypes, UUID } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//ID: *
//Nombre *
//Resumen del plato *
//Puntuación
//Nivel de "comida saludable"
//Paso a paso
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      dafaultValue: DataTypes.UUID
    },
    name: {
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
