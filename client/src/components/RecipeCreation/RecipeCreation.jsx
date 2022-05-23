
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiets, postRecipe } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
let regexImg = /(https?:\/\/.*\.(?:png|jpg|svg))/i;
function validateInput(input) {
  let errors = {};

  if (!input.title || !/([a-zA-Z])\w+/g.test(input.title)) {
    errors.title =
      "Don't have any ideas? It's ok, something descriptive should work or not... take mexican 'mole' as an example 😅";
  }
  if (input.spoonacularScore < 0 || input.spoonacularScore > 100) {
    errors.spoonacularScore = "Rating must be between 0 and 100";
  }
  if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "The health level must be between 0 and 100.";
  }
  if (!input.summary) {
    errors.summary =
      "Brief dish description... still without any ideas, huh? Can we suggest you something like 'It tastes like something you've never had before'? 😉";
  }

  if (!input.image.length  && !regexImg.test(input.image)) {
    errors.image = `Feel free to leave this default image or add a new one. For now we only take free stock photos you can find online(You know copy can be a bummer sometimes but,  hey! Let's respect other people's creative properties 😉). We are working on our servers to let you add your own photos. In the meanwhile... visit this page to get really good photos https://www.pexels.com/es-es/  
    We'll like you to remember you that you can actually donate to the author of the photo you choose😉`;
  }
  return errors;
}
export default function RecipeCreation() {
  const dispatch = useDispatch();

  const stateDiets = useSelector((state) => state.diets);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    spoonacularScore: "50",
    healthScore: "50",
    image:
      "" ||
      "https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    analyzedInstructions: "",
    diets: [],
  });

  function handleCheck(e) {
    if (e.target.checked && !recipe.diets.includes(e.target.value)) {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, e.target.value],
      });
    } else {
      setRecipe({
        ...recipe,
        diets: recipe.diets.filter((diet) => diet !== e.target.value),
      });
    }
    // console.log(recipe)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateInput(recipe));
    if (
      recipe.title &&
      recipe.summary &&
      recipe.spoonacularScore > 0 &&
      recipe.spoonacularScore < 100 &&
      recipe.healthScore > 0 &&
      recipe.healthScore < 100 && 
      recipe.analyzedInstructions.length &&
      recipe.diets.length  &&
      recipe.image.length   
    ) {
      dispatch(postRecipe(recipe));
      alert(`Recipe cooked! Ready to be served at home 😉`);
      navigate("/home");
      setRecipe({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "",
        diets: [],
      });
    } else {
      alert(`All fields must be fulfilled`);
    }
  }

  function handleReload() {
    const response = window.confirm("Do you want to cancel?");
    if (response === true) {
      window.location.reload();
    }
  }

  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateInput({
        ...recipe,
        [e.target.name]: e.target.value, //Validate if its all right
      })
    );
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
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "red" }}> {errors.title}</p>}
        <label>Summary:</label>
        <input name="summary" value={recipe.summary} onChange={handleChange} />
        {errors.summary && <p style={{ color: "red" }}> {errors.summary}</p>}
        <label>spoonacularScore:</label>
        <input
          type="number"
          min="1"
          max="100"
          name="spoonacularScore"
          value={recipe.spoonacularScore}
          onChange={handleChange}
        />
        {errors.spoonacularScore && (
          <p style={{ color: "red" }}> {errors.spoonacularScore}</p>
        )}
        <label>healthScore:</label>
        <input
          type="number"
          min="1"
          max="100"
          name="healthScore"
          value={recipe.healthScore}
          onChange={handleChange}
        />
        {errors.healthScore && (
          <p style={{ color: "red" }}>{errors.healthScore}</p>
        )}
        <label>Image or photo:</label>
        <input name="image" value={recipe.image} onChange={handleChange} />
        {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
        <label>Steps:</label>
        <input
          name="analyzedInstructions"
          value={recipe.analyzedInstructions}
          onChange={handleChange}
        />
        <label>Diets</label>
        {stateDiets ? (
              <div>
                {stateDiets.map((d) => (
                  <label key={d.id}>
                    <p>{d.name}</p>
                    <input
                      onChange={handleCheck}
                      type="checkbox"
                      name={d.name}
                      value={d.id}
                    />
                  </label>
                ))}{" "}
              </div>
            ) : (
              <p>Loading...</p>
            )}
        <button type="submit" onClick={handleSubmit}>
          Send to the kitchen 👨‍🍳👩‍🍳
        </button>
      </form>
      <button onClick={handleReload}>Cancel</button>
    </div>
  );
}
