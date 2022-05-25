import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Paging/Pagination";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import NavBar from "../NavBar/NavBar";
import Loader from "./Loader";
import './Home.css'
import { getAll } from "../../redux/actions";
import Search from "../SearchBar/SearchBar";
const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  // Loader
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    dispatch(getAll());
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const iOfLastRecipe = currentPage * recipesPerPage;
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe);

  // Local states for filters
  const [, setOrder] = useState("");
  const [, setRating] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAll());
  }

  return (
    <div className="wrapperHome">
      {loader ? (
        <Loader />
      ) : (
        <div className="">
          <div className="Video-NavBar">
              <Link to="/home">
                <div className="video">
                 <video autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653333566~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4305%2F13%2F346526234%2F1394516880.mp4~hmac=155ed7d30492896f91200057a8c9acc8002f1b11e0a56f6be04fd4948695c123/vimeo-prod-skyfire-std-us/01/4305/13/346526234/1394516880.mp4?filename=Pexels+Videos+2620043.mp4"></video>
                </div>
              </Link>
              <NavBar active={true} />
            <video className="video" autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653337072~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4365%2F14%2F371826781%2F1544220979.mp4~hmac=fe8c02c426c65348d5340d6560ab2c0794d825867d049fd30d771d0d5ca38069/vimeo-prod-skyfire-std-us/01/4365/14/371826781/1544220979.mp4?filename=video.mp4"></video>
            </div>
          <div className="">
            <div className="">
              <button onClick={handleClick}>See all recipes</button>
              <Filter
                setCurrentPage={setCurrentPage}
                setRating={setRating}
                setOrder={setOrder}
              />
               <Search /> 
            </div>
            <div >
              <div className="Pagination">
              <Pagination
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length} //Number
                paginate={paginate}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
              </div>
              <div className="gridCards">
              <div className="Cards">
            {currentRecipes ? (
                <div className="recipesCards">
                  {currentRecipes?.map((e) => {
                    return (
                      <Link to={`/recipes/${e.id}`} key={e.id}>
                        <Card
                          key={e.id}
                          id= {`ID:${e.id}`}
                          image={e.image}
                          title={e.title}
                          healthScore={`healthScore: ${e.healthScore}`}
                          diets={`Diets: ${e.diets}`}
                          dishTypes={`Dish type: ${e.dishTypes ? e.dishTypes: 'Maybe we will add them later'}`}
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <h1>Food's not ready yet</h1>
              )}
            </div>
              </div>
          
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;