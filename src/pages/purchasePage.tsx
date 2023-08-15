import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "api/pay/paymentIntent";

export default function PurchasePage() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error: submitError } = await elements!.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const returnValue = await createPaymentIntent({ amount: 200 });
    const clientSecret = returnValue["clientSecret"];

    await stripe!.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });
  };

  return (
    <div>
      <p>カードの登録画面</p>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>
          支払う
        </button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}
