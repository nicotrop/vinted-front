import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsSignup, setNewsSignup] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletter = (event) => {
    const value = event.target.checked;
    setNewsSignup(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBody = {
      email: email,
      username: username,
      password: password,
      newsletter: newsSignup,
    };

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        newBody
      );

      if (response.data.token) {
        const newToken = response.data.token;
        Cookies.set("token", newToken);
        setToken(newToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="input-card">
              <h2>S'inscrire</h2>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Nom d'utilisateur"
                onChange={handleUsernameChange}
              />
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Mot de passe"
                onChange={handlePasswordChange}
              />
              <div className="newsletter-input">
                <input
                  type="checkbox"
                  name="signup to newsletter"
                  value={newsSignup}
                  onChange={handleNewsletter}
                />
                <span>S'inscrire à notre newsletter</span>
              </div>
              <input className="blue-btn" type="submit" value="S'inscrire" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
