import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import Toggle from "react-toggle";
// import { useState } from "react";

const Header = ({
  token,
  setUser,
  setValues,
  values,
  isChecked,
  setIsChecked,
  setTitle,
}) => {
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
            <input
              type="search"
              placeholder="Rechercher des articles"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </div>
          <div className="controls">
            <label>
              <span>Trier par prix : </span>
              <Toggle
                defaultChecked={isChecked}
                onChange={(event) => {
                  setIsChecked(event.target.checked);
                }}
              />
            </label>
            <div className="slider">
              <span>Prix entre :</span>
              <Slider values={values} setValues={setValues} />
            </div>
          </div>
        </div>
        <div className="nav-col-3">
          {!token ? (
            <>
              <li>
                <Link to="signup">
                  <button>s'inscrire</button>
                </Link>
              </li>
              <li>
                <Link to="signin">
                  <button>se connecter</button>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  setUser(null);
                }}
              >
                se deconnecter
              </button>
            </li>
          )}
          <li>
            <button className="blue-btn">vends tes articles</button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
