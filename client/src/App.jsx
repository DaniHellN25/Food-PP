import React from "react";
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import Card from './components/Card/Card';
import CardDetail from './components/CardDetail/CardDetail';
import Cards from './components/Cards/Cards';
import DietTypes from './components/DietTypes/DietTypes';
import Favorites from './components/Favorites/Favorites';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import Paging from './components/Paging/Paging';
import RecipeCreation from './components/RecipeCreation/RecipeCreation';
import SearchBar from './components/SearchBar/SearchBar';
//importar todos mis componentes 
function App() {
  return (
  <React.Fragment>
    <NavBar/>
    <SearchBar/>
    <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/home" element={<Paging/>}/>
    <Route path="/recipes" element={<Cards/>}/>
    <Route path="/recipe" element={<RecipeCreation/>}/>
    <Route path="/types" element={<DietTypes/>}/>
    <Route path="/Cookbook" element={<Favorites/>}/>
    </Routes>
  </React.Fragment>
  );
}

export default App;
