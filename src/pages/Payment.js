import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_live_51JwqGrHYGNStC4tEdUyb134wVGz3xSnR50iUfMeQZly5P3sSovymiJQt7FJJIMBQZpfHojylZKieVKH5ZjZOzhl000U68Y2Ctx"
);

const Payment = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const { name, price } = location.state;
  const buyersProtection = price * 0.1;
  const shipping = price * 0.2;
  const total = price + buyersProtection + shipping;

  return !token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="container">
      <div className="payment-form">
        <form>
          <p>Résumé de la commande</p>
          <p>
            <span>Commande </span>
            <span>{price.toFixed(2)}</span>
          </p>
          <p>
            <span>Frais protection acheteurs </span>
            <span>{buyersProtection.toFixed(2)}</span>
          </p>
          <p className="">
            <span>Frais de port </span>
            <span>{shipping.toFixed(2)}</span>
          </p>
          <p className="">
            <span>Total </span>
            <span>{total.toFixed(2)}</span>
          </p>
          <p>
            Il ne vous reste plus qu'un étape pour vous offrir {name}. Vous
            allez payer {total.toFixed(2)} (frais de protection et frais de port
            inclus)
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </form>
      </div>
    </div>
  );
};

export default Payment;
