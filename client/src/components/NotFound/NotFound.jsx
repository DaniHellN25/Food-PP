
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="infoNotFound">
      <div className="container-404 ">
        <div className="card-404">
          <div className="content">
            <p>You look a bit lost... come, let's go home 😉</p>
            <button className="btn" onClick={() => navigate("/home")}>
              Go home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;