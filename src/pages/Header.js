import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="container">
      <ul className="nav-bar-list">
        <li className="nav-col-1">
          <Link to="/">
            <img
              src="https://lereacteur-vinted.netlify.app/static/media/logo.3dcf8b02.png"
              alt=""
            />
          </Link>
        </li>
        <div className="nav-col-2">
          <div className="input-wrapper">
            <div className="font-icon">
              <FontAwesomeIcon icon="magnifying-glass" />
            </div>
            <input type="search" placeholder="Rechercher des articles"></input>
          </div>
        </div>
        <div className="nav-col-3">
          <li>
            <Link to="signup">
              <button>s'inscrire</button>
            </Link>
          </li>
          <li>
            <button>se connecter</button>
          </li>
          <li>
            <button className="blue-btn">vends tes articles</button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
