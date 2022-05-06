import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = ({setUser}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsSignup, setNewsSignup] = useState(false);
  const [errorMsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  //handle change functions
  const handleUsernameChange = (event) =>  setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNewsletter = (event) => setNewsSignup(event.target.checked);

  //handle submit function with setUser function & error handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrormsg("");
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
        setUser(newToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.statusText);
      setErrormsg(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div className="input-card">
              <h1>S'inscrire</h1>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Nom d'utilisateur"
                onChange={handleUsernameChange}
              />
              <input
                type="email"
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
            {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
