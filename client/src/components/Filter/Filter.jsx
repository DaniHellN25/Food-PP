import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../redux/actions/index.jsx";

export default function Filter() {
  const dispatch = useDispatch();
  function handleSelect(e) {
    dispatch(filter(e.target.value));
  }

  return (
    <div>
      <select onChange={handleSelect}>
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
