//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./pages/Header";
import Signup from "./pages/Signup";

//CSS
import "./App.css";
import "./sass/header.scss";
import "./sass/global.scss";
import "./sass/home.scss";
import "./sass/offer.scss";
import "./sass/signup.scss";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
          <Route path="signup" element={<Signup />} />
          <Route path="offer/:id" element={<Offer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
