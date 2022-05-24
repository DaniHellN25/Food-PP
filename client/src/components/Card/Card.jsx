import React from 'react'
import './Card.css'
export default function Card(props) {
  return (
    <div className='Card'>
      <div>
      <div>
        <h1>{props.id}</h1>
      </div>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div className='imgCardDiv'>
    <img className='imgCard' src={props.image} alt="" />
      </div>
      </div>
      <div>
        <h3>{props.diets}</h3>
      </div>
      <div>
        <h3>{props.dishTypes}</h3>
      </div>
      <div>
        <h3>{props.healthScore}</h3>
      </div>
      <div>
        <h3>{props.spoonacularScore}</h3>
      </div>
      <div>
        <h3>{props.name}</h3>
      </div>
      <div>
        <h3>{props.description}</h3>
      </div>
    </div>
  )
}

