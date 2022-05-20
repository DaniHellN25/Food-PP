import React from "react";
import { Link} from "react-router-dom";

export default function Landing() {
  return (
    <div>
      "And now, with an open heart and an empty stomach, I say unto you in the
      words of Takeshi Kaga's uncle ...
      <div>
       <Link to={'/home'}> <button >Allez cuisine!!!"</button> </Link> 
      </div>
    </div>
  );
}
