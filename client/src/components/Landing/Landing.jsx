import React from "react";
import { Link} from "react-router-dom";
import './Landing.css'
export default function Landing() {
  return (

    <div className="wrapper">
      <div className="Landing-wrapper">
        <div className="landing-card">
          <div className="content">
          <h2 className="text"> Welcome to my project, feel free to search recipes or create your own 😉</h2> 
      <h1 className="text"> And now, with an open heart and an empty stomach, <br></br> I say unto you in the
      words of Takeshi Kaga's uncle ...</h1> 
       <Link to={'/home'}> <button className="btn">"Allez cuisine!!!"</button> </Link> 
          </div>
        </div>
      
      </div>    
   </div>
  );
}
