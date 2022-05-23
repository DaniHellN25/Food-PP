import React, { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
export default function Types() {

  const dispatch = useDispatch();
  const renderDiets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div>
      <div>{<NavBar/>}</div>
      {renderDiets.length ?
        renderDiets.map((diet) => (
          <Card key={diet.id}
            name={diet.name}
            description={diet.description}
          />
        )) : (<h1>Searching diet types...</h1>)}
    </div>
  )
}
