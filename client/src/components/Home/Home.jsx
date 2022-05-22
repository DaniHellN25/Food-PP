import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Paging/Pagination";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import NavBar from "../NavBar/NavBar";
import Loader from "./Loader";
import { getAll } from "../../redux/actions";
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

  // Handlers
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAll());
  }

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-content home-content">
          <div className="nav-home">
            <div className="max-content">
              <Link to="/home">
                <div className="logo">
                  <img src='../../../public/favicon.ico' alt="logo" height="40px" />
                </div>
              </Link>
              <NavBar active={true} />
            </div>
          </div>
          <div className="content-filter">
            <div className="card-filter">
              <button onClick={handleClick}>Recipes</button>
              <Filter
                setCurrentPage={setCurrentPage}
                setRating={setRating}
                setOrder={setOrder}
              />
            </div>
            <div className="principal-container">
              <Pagination
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length} //Number
                paginate={paginate}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
              {currentRecipes ? (
                <div className="recipes-home">
                  {currentRecipes?.map((e) => {
                    return (
                      <Link to={`/recipe/${e.id}`} key={e.id}>
                        <Card
                          key={e.id}
                          image={e.image}
                          title={e.title}
                          healthScore={e.healthScore}
                          diets={e.diets}
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <h1>404</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;