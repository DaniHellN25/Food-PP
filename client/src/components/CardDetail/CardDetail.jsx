
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavoriteRecipe, clear, getById, removeFavoriteRecipes } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Loader from "../Home/Loader";
import './CardDetail.css'

const CardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(clear()); //Clear detail
    };
  }, [dispatch, id]);

  function handleFavorite(e) {
    e.preventDefault();
    dispatch(addFavoriteRecipe(detail))
    alert(`Recipe added! It's waiting for you at "Your Cookbook" 😉`);
  }
  function handleRemove(e) {
    e.preventDefault();
    dispatch(removeFavoriteRecipes(detail.id))
    alert(`Recipe removed! It wasn't so good, Isn't it? 😉`);
  }

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <div className="wrapperDetail">
     <div className="Video-NavBarD">
              <Link to="/home">
                <div className="video">
                 <video autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653333566~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4305%2F13%2F346526234%2F1394516880.mp4~hmac=155ed7d30492896f91200057a8c9acc8002f1b11e0a56f6be04fd4948695c123/vimeo-prod-skyfire-std-us/01/4305/13/346526234/1394516880.mp4?filename=Pexels+Videos+2620043.mp4"></video>
                </div>
              </Link>
              <NavBar active={true} />
            <video className="video" autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653337072~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4365%2F14%2F371826781%2F1544220979.mp4~hmac=fe8c02c426c65348d5340d6560ab2c0794d825867d049fd30d771d0d5ca38069/vimeo-prod-skyfire-std-us/01/4365/14/371826781/1544220979.mp4?filename=video.mp4"></video>
            </div>
      {loader ? (
        <Loader></Loader>
      ) : (
        <div>
          {detail.length === 0 ? (
            <h1>Not Found</h1>
          ) : (
            <div className="wrapperDetail">
              <div className="card-detail">
                <div className="title-image-home">
                  <img
                    src={detail.image ? detail.image : 'Not Found'}
                    alt="It must be somewhere 🔎"
                    width="450"
                    />
                  <button onClick={() => navigate("/home")} className="btnDetail">
                    Home
                  </button>
                <button className="btnDetail" onClick={(e)=> handleFavorite(e)}>Add to your Cookbook⭐</button>
                  <button className="btnDetail" onClick={(e)=> handleRemove(e)}>Remove from Cookbook❌</button>
                </div>
                <div className="content-detail">
                    <h1>{detail.title}</h1>
                    <>
                    {detail.ownRecipe === true ? <div>
                      <h2>This recipe was created by the community</h2>
                      </div> : ('')}
                      </>
                    <>
                    </>
                  <>{detail.ownRecipe ? ''  : <div>
                    <h3>Is it  vegetarian?</h3>
                    <p >{detail.vegetarian === true? 'Yes it is 😉'
                        : "Nope, not this time cowboy🥺"}</p>
                  </div>}
                    
                  </>
                  <>{detail.ownRecipe ? ''  : <div><h3>Is it vegan?</h3>
                    <p >{detail.vegan === true ? 'Yes it is 😉'
                        : "Nope, not this time cowboy🥺"}</p></div>}
                  </>
                  <> {detail.ownRecipe ? ''  : <div><h3>Is it Gluten Free?</h3>
                    <p >{detail.glutenFree === true ? 'Yes it is 😉'
                        : "Nope, not this time cowboy 🥺"}</p></div>}
                  </>
                  <>
                    <h3>Summary</h3>
                    <p >{detail.summary ? detail.summary
                        : "No data found"}</p>
                  </>
                  <>
                    <h3>spoonacularScore</h3>
                    <p>
                      {detail.spoonacularScore
                        ? `${detail.spoonacularScore} spoonacularScore`
                        : "No data found"}
                    </p>
                  </>
                  <>
                    <h3>Health</h3>
                    <p>
                      {detail.healthScore
                        ? `${detail.healthScore} healthScore`
                        : "No data found"}
                    </p>
                  </>
                  <>
                    <h3>Diets</h3>
                    <p>
                       {detail.diets ? `${detail.diets}`
                        : "No data found"}
                    </p>
                  </>
                  
                    <h3>Instructions</h3>
                    <p>
                      {detail.analyzedInstructions
                        ? detail.analyzedInstructions
                        : "No steps were found. Time to experiment a little I guess 👩‍🍳👩‍🍳"}
                    </p>
                    <>
                      <h3>DishTypes</h3>
                      <p>
                        {detail.dishTypes? detail.dishTypes
                        : "No data found"} 
                      </p>
                    </>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDetail