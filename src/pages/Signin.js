import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Signin = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  token,
  setToken,
}) => {
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
        setToken(response.data.token);
        setUsername(response.data.account.username);
        Cookies.set(token, token, { expires: 1 / 48 });
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="signin-form">
          <form onSubmit={handleSubmit}>
            <h2>Se connecter</h2>
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
            <input type="submit" value="Se connecter" />
            <Link to="/signup">
              <p>Pas encore de compte? Inscris-toi !</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
