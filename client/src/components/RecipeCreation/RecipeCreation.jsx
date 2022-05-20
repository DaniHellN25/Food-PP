import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

export default function RecipeCreation() {
  const dispatch = useDispatch();

  const stateDiets = useSelector((state) => state.diets);

  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    image: "",
    analyzedInstructions: "",
    diets: new Set([]),
  });

  
  function handleSelect(e) {
 setRecipe({
   ...recipe, 
   diets: [...recipe.diets, e.target.value]
 })
 console.log(recipe)
  }
  
  function handleSubmit() {}
 
  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div>
      <div>{<NavBar />}</div>
      <div>Recipe Creation</div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input name="title" value={recipe.title} onChange={handleChange} />
        <label>Summary</label>
        <input name="summary" value={recipe.summary} onChange={handleChange} />
        <label>spoonacularScore</label>
        <input
          name="spoonacularScore"
          value={recipe.spoonacularScore}
          onChange={handleChange}
        />
        <label>healthScore</label>
        <input
          name="healthScore"
          value={recipe.healthScore}
          onChange={handleChange}
        />
        <label>image</label>
        <input name="image" value={recipe.image} onChange={handleChange} />
        <label>analyzedInstructions</label>
        <input
          name="analyzedInstructions"
          value={recipe.analyzedInstructions}
          onChange={handleChange}
        />
        <select onChange={handleSelect}>
          {stateDiets.length && stateDiets.map((diet)=>{
            return  <option key={diet.id} value={diet.id}>{diet.name}</option>
          })
          }
        Diets</select>
      </form>
    </div>
  );
}
