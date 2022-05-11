import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(process.env.PUBLIC_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const token = Cookies.get("token");
  const location = useLocation();
  const { name, price, userID, title } = location.state;
  console.log(location.state);
  const buyersProtection = price * 0.1;
  const shipping = price * 0.2;
  const total = price + buyersProtection + shipping;

  return !token ? (
    <Navigate to="/signin" />
  ) : !location ? (
    <Navigate to="/" />
  ) : (
    <div className="bg-gray">
      <div className="container">
        {complete ? (
          <div className="payment-form">
            <div className="main-form-container">
              <div className="payment-page">
                <h1>Paiement effectué</h1>
                <div className="circle">
                  <div className="icon-check">
                    <FontAwesomeIcon icon="check" size="lg" />
                  </div>
                </div>
                {setTimeout(() => {
                  navigate("/");
                }, 1000)}
              </div>
            </div>
          </div>
        ) : (
          <div className="payment-form">
            <div className="main-form-container">
              <p className="title">Résumé de la commande</p>
              <ul>
                <li className="payment-list">
                  <span>Commande </span>
                  <span>{price.toFixed(2)} €</span>
                </li>
                <li className="payment-list">
                  <span>Frais protection acheteurs </span>
                  <span>{buyersProtection.toFixed(2)} €</span>
                </li>
                <li className="payment-list">
                  <span>Frais de port </span>
                  <span>{shipping.toFixed(2)} €</span>
                </li>
                <li className="payment-list">
                  <h3>Total </h3>
                  <h3>{total.toFixed(2)} €</h3>
                </li>
              </ul>
              <div className="border"></div>
              <p>
                Il ne vous reste plus qu'un étape pour vous offrir{" "}
                <span className="bold">{name}</span>. Vous allez payer{" "}
                <span className="bold">{total.toFixed(2)}</span> euros (frais de
                protection et frais de port inclus)
              </p>
              <div className="border"></div>
              <div className="stripe-card-element">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    userID={userID}
                    total={total}
                    title={title}
                    setComplete={setComplete}
                    setErrorMsg={setErrorMsg}
                    errorMsg={errorMsg}
                  />
                </Elements>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
