import React, { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import './DietTypes.css'
export default function Types() {

  const dispatch = useDispatch();
  const renderDiets = useSelector((state) => state.diets);
  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className='wrapperDiet'>
      <div className="Video-NavBar">
              <Link to="/home">
                <div className="video">
                 <video autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653333566~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4305%2F13%2F346526234%2F1394516880.mp4~hmac=155ed7d30492896f91200057a8c9acc8002f1b11e0a56f6be04fd4948695c123/vimeo-prod-skyfire-std-us/01/4305/13/346526234/1394516880.mp4?filename=Pexels+Videos+2620043.mp4"></video>
                </div>
              </Link>
              <NavBar active={true} />
            <video className="video" autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653337072~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4365%2F14%2F371826781%2F1544220979.mp4~hmac=fe8c02c426c65348d5340d6560ab2c0794d825867d049fd30d771d0d5ca38069/vimeo-prod-skyfire-std-us/01/4365/14/371826781/1544220979.mp4?filename=video.mp4"></video>
            </div>
            <div className='ContainerCards'>
              <h1>Here you'll find some info about the diet types that our recipes can have</h1>
            <div className='DietCards'>
            {renderDiets.length ?
        renderDiets.map((diet) => (
          
          <Card key={diet.id}
            name={diet.name}
            description={diet.description}
          />
        )) : (<h1>Searching diet types...</h1>)}
            </div>
            </div>
         
     
    </div>
  )
}
