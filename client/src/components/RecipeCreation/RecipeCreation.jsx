
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, postRecipe } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import './RecipeCreation.css'
 let regexURL = /^(https?:\/\/[a-zA-Z0-9_+%-]+(\.[a-zA-Z0-9+\_%-]+)*(:[0-9]{1,5})?(\/[a-zA-Z0-9+()?#~=&\._%-]*)*)?$/
let regexText = /^[A-Za-z]+$/
function validateInput(input) {
  let errors = {};

  if (!input.title || !regexText.test(input.title) || input.title.length > 60) {
    errors.title =
      "Only letters from A to Z are allowed. Don't have any ideas? It's ok, something descriptive should work or not... take mexican 'mole' as an example 😅 and remember the name should not be more than 60 characters, and no special characters are allowed, numbers are tho...";
  }
  if (input.spoonacularScore < 0 || input.spoonacularScore > 100) {
    errors.spoonacularScore = "spoonacularScore must be between 0 and 100";
  }
  if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "The healthScore must be between 0 and 100.";
  }
  if (!input.summary  || !regexText.test(input.summary))  {
    errors.summary =
      "Only letters from A to Z are allowed. Brief dish description... still without any ideas, huh? Can we suggest you something like 'It tastes like something you've never had before'? 😉";
  }

  if (!input.image.length || input.image.length > 300 || regexURL.test(input.image) === false) {
    errors.image = `Links with HTTPS protocol is a must here AND... Feel free to leave this default image or add a new one. For now we only take free stock photos you can find online(You know copy can be a bummer sometimes but,  hey! Let's respect other people's creative properties 😉). We are working on our servers to let you add your own photos. In the meanwhile... visit this page to get really good photos https://www.pexels.com/es-es/  
    We'll like you to remember you that you can actually donate to the author of the photo you choose😉`;
  }
  if (!input.analyzedInstructions.length) {
    errors.image = `We highly recommend to you to be clear and concise for the "Steps" section, don't overlook the obvious😉`;
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
      recipe.title && regexText.test(recipe.title)  &&
      recipe.summary && regexText.test(recipe.summary) &&
      recipe.spoonacularScore > 0 &&
      recipe.spoonacularScore <= 100 &&
      recipe.healthScore > 0 &&
      recipe.healthScore <= 100 && 
      recipe.analyzedInstructions.length &&
      recipe.diets.length  &&
      recipe.image.length > 50  && regexURL.test(recipe.image)
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
      alert(`All fields must be fulfilled correctly`);
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
    <div className="wrapperCreation">
       <div className="Video-NavBar">
              <Link to="/home">
                <div className="video">
                 <video autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653333566~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4305%2F13%2F346526234%2F1394516880.mp4~hmac=155ed7d30492896f91200057a8c9acc8002f1b11e0a56f6be04fd4948695c123/vimeo-prod-skyfire-std-us/01/4305/13/346526234/1394516880.mp4?filename=Pexels+Videos+2620043.mp4"></video>
                </div>
              </Link>
              <NavBar active={true} />
            <video className="video" autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653337072~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4365%2F14%2F371826781%2F1544220979.mp4~hmac=fe8c02c426c65348d5340d6560ab2c0794d825867d049fd30d771d0d5ca38069/vimeo-prod-skyfire-std-us/01/4365/14/371826781/1544220979.mp4?filename=video.mp4"></video>
            </div>
            <div className="section-create">
            <h1>Here you can add your own Recipe</h1>
      <form className="Form">
        <label className="labelCreate">Title:</label>
        <input className="inputCreate"
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "blue" }}> {errors.title}</p>}
        <label className="labelCreate">Summary:</label>
        <input className="inputCreate" name="summary" value={recipe.summary} onChange={handleChange} />
        {errors.summary && <p style={{ color: "blue" }}> {errors.summary}</p>}
        <label className="labelCreate">spoonacularScore:</label>
        <input className="inputScore"
          type="number"
          min="1"
          max="100"
          name="spoonacularScore"
          value={recipe.spoonacularScore}
          onChange={handleChange}
        />
        {errors.spoonacularScore && (
          <p style={{ color: "blue" }}> {errors.spoonacularScore}</p>
        )}
        <label className="labelCreate">healthScore:</label>
        <input className="inputScore"
          type="number"
          min="1"
          max="100"
          name="healthScore"
          value={recipe.healthScore}
          onChange={handleChange}
        />
        {errors.healthScore && (
          <p style={{ color: "blue" }}>{errors.healthScore}</p>
        )}
        <label className="labelCreate">Image or photo:</label>
        <input className="inputCreate" type="url" name="image" value={recipe.image} onChange={handleChange} />
        {errors.image && <p style={{ color: "blue" }}>{errors.image}</p>}
        <label className="labelCreate">Steps:</label>
        <textarea className="inputSteps"
          name="analyzedInstructions"
          value={recipe.analyzedInstructions}
          onChange={handleChange}
        />
        {errors.analyzedInstructions && <p style={{ color: "blue" }}> {errors.analyzedInstructions}</p>}
        <label className="labelCreate">Diets</label>
        {stateDiets ? (
              <div className="CheckboxD">
                {stateDiets.map((d) => (
                  <label className="labelCreate" key={d.id}>
                    <p className="checkText">{d.name}</p>
                    <input className="inputCheckBox"
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
      </form>
            </div>
      
      <div className="divButton">
        <button className="btnCreate" type="submit" onClick={handleSubmit}> Send to the kitchen 👨‍🍳👩‍🍳
        </button>
        {recipe.diets.length ? <button className="btnCreate" onClick={handleReload}>Cancel</button> : '' }
  
      </div>
    </div>
  );
}
