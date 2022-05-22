import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiets, postRecipe,  } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

export default function RecipeCreation() {
  const dispatch = useDispatch();

  const stateDiets = useSelector((state) => state.diets);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    image:
      "" ||
      "https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    analyzedInstructions: "",
    diets: [],
  });

  function handleSelect(e) {
    if (!recipe.diets.includes(e.target.value)) {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(recipe));
    alert("Recipe created");
    navigate("/home");
    setRecipe({
      title: "",
      summary: "",
      spoonacularScore: 25,
      healthScore: 25,
      analyzedInstructions: "",
      image: "",
      diets: [],
    });
  }

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
      <form>
        <label>Title</label>
        <input type='text' name='title' value={recipe.title} onChange={handleChange} />
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
          {stateDiets.length &&
            stateDiets.map((diet) => {
              return (
                <option key={diet.id} value={diet.id}>
                  {diet.name}
                </option>
              );
            })}
          Diets
        </select>
        <button type="submit" onClick={handleSubmit}>
          Send to the kitchen 👨‍🍳👩‍🍳
        </button>
      </form>
    </div>
  );
}
