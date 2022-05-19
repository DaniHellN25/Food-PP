import React from 'react'

export default function Card(props) {
  return (
    <div>
      <div>
        <img src={props.image} alt="" />
      </div>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div>
        <h3>{props.diets}</h3>
      </div>
      <div>
        <h3>{props.healthScore}</h3>
      </div>
      <div>
        <h3>{props.spoonacularScore}</h3>
      </div>
    </div>
  )
}

