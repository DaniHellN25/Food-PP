
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clear, getById } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Loader from "../Home/Loader";

const CardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(clear()); //Clean detail
    };
  }, [dispatch, id]);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <div className="detail-wrapper">
      <div className="Home-logo">
        <div className="Logo-Nav">
          <Link to="/home">
            <div className="logo">
              <h1>Logo</h1>
            </div>
          </Link>
          <NavBar active={false} />
        </div>
      </div>
      {loader ? (
        <Loader></Loader>
      ) : (
        <div>
          {detail.length === 0 ? (
            <h1>Not Found</h1>
          ) : (
            <div className="detail-container">
              <div className="card-detail">
                <div className="image-button-detail">
                  <img
                    src={detail.image ? detail.image : 'Not Found'}
                    alt="Recipe"
                    width="450"
                    />
                  <button onClick={() => navigate("/home")} className="btn">
                    Home
                  </button>
                </div>
                <div className="content-detail">
                    <>
                    {detail.ownRecipe === true ? <div>
                      <h1>This recipe was created by the community</h1>
                      </div> : ('')}
                      </>
                    <>
                    </>
                  <h2>{detail.title}</h2>
                  <>{detail.ownRecipe ? ''  : <div>
                    <h4>Is it  vegetarian?</h4>
                    <p >{detail.vegetarian === true? 'Yes it is 😉'
                        : "Nope, not this time cowboy"}</p>
                  </div>}
                    
                  </>
                  <>{detail.ownRecipe ? ''  : <div><h4>Is it vegan?</h4>
                    <p >{detail.vegan === true ? 'Yes it is 😉'
                        : "Nope, not this time cowboy"}</p></div>}
                  </>
                  <> {detail.ownRecipe ? ''  : <div><h4>Is it Gluten Free?</h4>
                    <p >{detail.glutenFree === true ? 'Yes it is 😉'
                        : "Nope, not this time cowboy"}</p></div>}
                  </>
                  <>
                    <h4>Summary</h4>
                    <p >{detail.summary ? detail.summary
                        : "No data found"}</p>
                  </>
                  <>
                    <h4>Rating</h4>
                    <p>
                      {detail.spoonacularScore
                        ? `${detail.spoonacularScore} spoonacularScore`
                        : "No data found"}
                    </p>
                  </>
                  <>
                    <h4>Health</h4>
                    <p>
                      {detail.healthScore
                        ? `${detail.healthScore} healthScore`
                        : "No data found"}
                    </p>
                  </>
                  <>
                    <h4>Diets</h4>
                    <p>
                       {detail.diets ? `${detail.diets}`
                        : "No data found"}
                    </p>
                  </>
                    <h4>Instructions</h4>
                    <p>
                      {detail.analyzedInstructions
                        ? detail.analyzedInstructions
                        : "No steps were found. Time to experiment a little I guess 👩‍🍳👩‍🍳"}
                    </p>
                    <>
                      <h4>DishTypes</h4>
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