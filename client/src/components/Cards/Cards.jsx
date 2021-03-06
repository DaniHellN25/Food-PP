import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/actions/index.jsx";
import Filter from "../Filter/Filter.jsx";

export default function Cards() {
  const dispatch = useDispatch();
  const renderRecipes = useSelector((state) => state.copy);
  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <div>
      <Filter></Filter>
      <h2>Spoonacular's Recipes & Created Recipes</h2>
      {renderRecipes.length ?
        renderRecipes.map((recipe) => (
          <Card key={recipe.id}
            image={recipe.image}
            title={recipe.title}
            diets={recipe.diets}
            summary={recipe.summary}
            SpoonacularScore={recipe.SpoonacularScore}
            healthScore={recipe.healthScore}
          />
        )) : (<h1>Cooking something for you...</h1>)}
    </div>
  );
}