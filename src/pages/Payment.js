import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JwqGrHYGNStC4tECXJ2Racovtc29nA8s9hqP4KUSKTbyX3ciZXL9jsrbwXULjQZUEkoflCkoYiExPwpLGxt5clP00z5BoAPnS"
);

const Payment = () => {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const token = Cookies.get("token");
  const location = useLocation();
  const { name, price, userID, description } = location.state;
  console.log(location.state);
  const buyersProtection = price * 0.1;
  const shipping = price * 0.2;
  const total = price + buyersProtection + shipping;

  return !token ? (
    <Navigate to="/signin" />
  ) : !location ? (
    <Navigate to="/" />
  ) : (
    <div className="container bg-gray">
      {complete ? (
        <div className="payment-form">
          <div className="main-form-container">
            <div className="payment-page">
              <h1>Paiement effectué</h1>
              <FontAwesomeIcon icon="check" />
              {/* {setTimeout(() => {
                  navigate("/");
                }, 1000)} */}
            </div>
          </div>
        </div>
      ) : (
        <div className="payment-form">
          <div className="main-form-container">
            <p>Résumé de la commande</p>
            <p>
              <span>Commande </span>
              <span>{price.toFixed(2)} €</span>
            </p>
            <p>
              <span>Frais protection acheteurs </span>
              <span>{buyersProtection.toFixed(2)} €</span>
            </p>
            <p className="">
              <span>Frais de port </span>
              <span>{shipping.toFixed(2)} €</span>
            </p>
            <p className="">
              <span>Total </span>
              <span>{total.toFixed(2)} €</span>
            </p>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir {name}. Vous
              allez payer {total.toFixed(2)} euros (frais de protection et frais
              de port inclus)
            </p>
            <div className="stripe-card-element">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  userID={userID}
                  total={total}
                  description={description}
                  setComplete={setComplete}
                  complete={complete}
                />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
