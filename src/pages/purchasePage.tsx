import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentMethod } from "api/stripe/paymentMethod";
import { createCard } from "api/pay/card";
import { createPurchase } from "api/pay/purchase";
import { useLocation } from "react-router-dom";

export default function PurchasePage() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage] = useState(null);

  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardElement = elements?.getElement("card");
    if (!(stripe && cardElement)) return;
    const paymentMethod = await createPaymentMethod(stripe, cardElement, "John");
    if (!(paymentMethod && paymentMethod["card"])) return;
    const responseData = await createCard({
      ex_year: String(paymentMethod["card"]["exp_year"]).substring(2, 4),
      ex_month: String(paymentMethod["card"]["exp_month"]),
      card_number: paymentMethod["card"]["last4"],
      payment_method_id: paymentMethod["id"],
    });
    const isSuccess = responseData.isSuccess;

    if (isSuccess) {
      // 購入する
      const responseData = await createPurchase({
        chapter: Number(queryParams.get("chapter")),
      });
      console.log(responseData);
    }
  };

  return (
    <div>
      <p>カードの登録画面</p>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !elements}>
          支払う
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}
