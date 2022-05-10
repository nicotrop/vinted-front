import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({
  userID,
  title,
  total,
  setComplete,
  setErrorMsg,
  errorMsg,
}) => {
  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userID,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title,
          amount: total,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setComplete(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <form className="stripe-form" onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" className="blue-btn">
          Pay
        </button>
        {errorMsg && (
          <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>
            {errorMsg}
          </p>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
