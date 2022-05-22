
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
    <div className="create-wrapper">
      <div className="nav-home">
        <div className="max-content">
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
        <>
          {detail.length === 0 ? (
            <h1>Not Found</h1>
          ) : (
            <div className="detail-container">
              <div className="card-detail">
                <div className="image-button-detail">
                  <img
                    src={detail[0].image ? detail[0].image : 'Not Found'}
                    alt="Recipe"
                    width="450"
                  />
                  <button onClick={() => navigate("/home")} className="btn">
                    Home
                  </button>
                </div>
                <div className="content-detail">
                  <h2>{detail[0].title}</h2>
                  <>
                    <h4>Summary</h4>
                    <p >{detail[0].summary}</p>
                  </>
                  <>
                    <h4>Rating</h4>
                    <p>
                      {detail[0].spoonacularScore
                        ? detail[0].spoonacularScore + " points"
                        : "No rating were found"}
                    </p>
                  </>
                  <>
                    <h4>Health</h4>
                    <p>
                      {detail[0].healthScore
                        ? `${detail[0].healthScore}%`
                        : "No health were found"}
                    </p>
                  </>
                  <>
                    <h4>Diets</h4>
                    <p>
                       {detail[0].diets}
                    </p>
                  </>

                  {detail[0].created === true ? (
                    ""
                  ) : (
                    <>
                    </>
                  )}
                  <>
                    <h4>Instructions</h4>
                    <p>
                      {detail[0].analyzedInstructions
                        ? detail[0].analyzedInstructions
                        : "no instructions were found"}
                    </p>
                  </>
                  {detail[0].created === true ? (
                    ""
                  ) : (
                    <>
                      <h4>DishTypes</h4>
                      <p>
                        {detail[0].dishTypes}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CardDetail