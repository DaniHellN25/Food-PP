import React from "react";
import './App.css';
import { Route, Routes} from "react-router-dom";
import DietTypes from './components/DietTypes/DietTypes';
import Favorites from './components/Favorites/Favorites';
import Landing from './components/Landing/Landing';
import RecipeCreation from './components/RecipeCreation/RecipeCreation';
import Home from "./components/Home/Home";
//importar todos mis componentes 
function App() {
  return (
  <React.Fragment>
    <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/recipe" element={<RecipeCreation/>}/>
    <Route path="/types" element={<DietTypes/>}/>
    <Route path="/Cookbook" element={<Favorites/>}/>
    </Routes>
  </React.Fragment>
  );
}

export default App;
