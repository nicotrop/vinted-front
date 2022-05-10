import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({
  userID,
  description,
  total,
  complete,
  setComplete,
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
      const response = await axios.post(" http://localhost:4000/payment", {
        stripeToken,
        description,
        total,
      });
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setComplete(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="stripe-form" onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" className="blue-btn">
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
