import { faCode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsSignup, setNewsSignup] = useState(false);
  const [body, setBody] = useState({});
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  console.log(Cookies.get(token));

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

    setBody(newBody);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        body
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

            <input
              type="checkbox"
              name="signup to newsletter"
              value={newsSignup}
              onChange={handleNewsletter}
            />

            <input type="submit" value="S'inscrire" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
