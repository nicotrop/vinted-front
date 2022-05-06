import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {useState} from "react";

const Signin = ({setUser}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBody = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        newBody
      );
      if (response.data.token) {
        setUser(response.data.token)
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      setErrormsg(error.response.data.message);

    }
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div className="input-card">
              <h1>Se connecter</h1>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Adresse email"
                onChange={handleEmailChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Mot de passe"
                onChange={handlePasswordChange}
              />
              <input className="blue-btn" type="submit" value="Se connecter" />
              <Link to="/signup">
                <p>Pas encore de compte? Inscris-toi !</p>
              </Link>
            </div>
            {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
