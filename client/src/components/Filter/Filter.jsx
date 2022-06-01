import React from "react";
import { filterByDiet, orderByName, orderByRating } from "../../redux/actions/index.jsx";
import { useDispatch} from "react-redux";
const Filter = ({ setCurrentPage,setRating, setOrder }) => {
  const dispatch = useDispatch();
  

  function handlerFilterByDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    setCurrentPage(1)
  }

  function handlerOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order ${e.target.value}`);
  }

  function handlerOrderByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value)); // dispatch
    setRating(`Rating ${e.target.value}`); // when setted page, the local state is modified and rendered
  }

  return (
    <div><label >Order by name</label>
      <select onChange={(e) => handlerOrderByName(e)}>
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
      </select>
      <label >Order by healthScore</label>
      <select onChange={(e) => handlerOrderByRating(e)}>
        <option value="High Score"> High score </option>
        <option value="Low Score"> Low score </option>
      </select>
      <label >Order by diet</label>
      <select onChange={handlerFilterByDiet}>
        <option value="All">All</option>
        <option value="Gluten Free">Gluten Free</option>
        <option value="Vegan">Vegan</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Lacto Vegetarian">Lacto Vegetarian</option>
        <option value="Ovo Vegetarian">Ovo Vegetarian</option>
        <option value="Lacto Ovo Vegetarian">Lacto Ovo Vegetarian</option>
        <option value="Dairy Free">Dairy Free</option>
        <option value="Paleolithic">Paleolithic</option>
        <option value="Pescetarian">Pescetarian</option>
        <option value="Pescatarian">Pescatarian</option>
        <option value="Paleo">Paleo</option>
        <option value="Whole 30">Whole 30</option>
        <option value="Ketogenic">Ketogenic</option>
        <option value="Primal">Primal</option>
        <option value="Low FODMAP">Low FODMAP</option>
        <option value="Fodmap Friendly">Fodmap Friendly</option>
      </select>
    </div>
  );
}


export default Filter;