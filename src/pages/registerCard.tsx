import React from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { createCard } from "api/pay/card";
import { chapterPagePath } from "constants/urls";

export default function ResisterCardPage() {
  const stripe = useStripe();
  const elements = useElements();
  const navigation = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const cardElement = elements!.getElement("cardNumber");
    // 新しいカードを作る場合
    const responseData = await stripe!.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });
    const paymentMethod = responseData["paymentMethod"];
    paymentMethod &&
      paymentMethod["card"] &&
      (await createCard({
        ex_year: String(paymentMethod["card"]["exp_year"]).substring(2, 4),
        ex_month: String(paymentMethod["card"]["exp_month"]),
        card_number: paymentMethod["card"]["last4"],
        payment_method_id: paymentMethod["id"],
      }).then(() => navigation(chapterPagePath)));
  };

  return (
    <div>
      <p>カードの登録画面</p>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <button onClick={handleSubmit}>提出</button>
    </div>
  );
}
