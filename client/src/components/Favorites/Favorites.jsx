import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import './Favorite.css'
export default function Favorites() {
  const favorite = useSelector((state) => state.favorites);

  
  return (
    <div className="FavoriteWrapper">
        <div className="Video-NavBar">
              <Link to="/home">
                <div className="video">
                 <video autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653333566~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4305%2F13%2F346526234%2F1394516880.mp4~hmac=155ed7d30492896f91200057a8c9acc8002f1b11e0a56f6be04fd4948695c123/vimeo-prod-skyfire-std-us/01/4305/13/346526234/1394516880.mp4?filename=Pexels+Videos+2620043.mp4"></video>
                </div>
              </Link>
              <NavBar active={true} />
            <video className="video" autoPlay muted preload loop src="https://vod-progressive.akamaized.net/exp=1653337072~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4365%2F14%2F371826781%2F1544220979.mp4~hmac=fe8c02c426c65348d5340d6560ab2c0794d825867d049fd30d771d0d5ca38069/vimeo-prod-skyfire-std-us/01/4365/14/371826781/1544220979.mp4?filename=video.mp4"></video>
            </div>
      <h1>Favorite Recipes</h1>
      <h2>Here you'll find your favorite recipes</h2>
      <div className="gridCards">
              <div className="Cards">
            {favorite ? (
                <div className="recipesCards">
                  {favorite?.map((e) => {
                    return (
                      <div>
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
            </div>
                    );
                  })}
                </div>
              ) : (
                <h1>You don't have any recipes in your Cookbook, go home, check details and add some 😉</h1>
              )}
            </div>
              </div>
    </div>
  );
}
