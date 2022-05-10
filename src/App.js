//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./pages/Header";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//Components

//CSS
import "./App.css";
import "./sass/header.scss";
import "./sass/global.scss";
import "./sass/home.scss";
import "./sass/offer.scss";
import "./sass/signup.scss";
import "./sass/signin.scss";
import "./sass/Toggle.scss";
import "./sass/publish.scss";
import "./sass/payment.scss";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faCheck);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [values, setValues] = useState([0, 180]);
  const [isChecked, setIsChecked] = useState("price-asc");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const setUser = (token) => {
    if (token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${isChecked}&limit=${limit}&page=${page}&title=${title}&priceMin=${values[0]}&priceMax=${values[1]}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        alert(error.response);
      }
    };
    fetchData();
  }, [title, values, isChecked, page, limit]);

  return isLoading ? (
    <p>En cours de chargement....</p>
  ) : (
    <div className="App">
      <Router>
        <Header
          token={token}
          setUser={setUser}
          setValues={setValues}
          values={values}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          setTitle={setTitle}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                offers={data.offers}
                page={page}
                setPage={setPage}
                limit={limit}
              />
            }
          />
          <Route path="signup" element={<Signup setUser={setUser} />} />
          <Route path="signin" element={<Signin setUser={setUser} />} />
          <Route path="publish" element={<Publish token={token} />} />
          <Route path="offer/:id" element={<Offer />}></Route>
          <Route path="payment" element={<Payment />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
