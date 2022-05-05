//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

//CSS
import "./App.css";
import "./sass/header.scss";
import "./sass/global.scss";
import "./sass/home.scss";
import "./sass/offer.scss";
import "./sass/signup.scss";
import "./sass/signin.scss";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsSignup, setNewsSignup] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement....</p>
  ) : (
    <div className="App">
      <Router>
        <Header {...library} />
        <Routes>
          <Route path="/" element={<Home offers={data.offers} />} />
          <Route
            path="signup"
            element={
              <Signup
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                newsSignup={newsSignup}
                setNewsSignup={setNewsSignup}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="signin"
            element={
              <Signin
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route path="offer/:id" element={<Offer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
