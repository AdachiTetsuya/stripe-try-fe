import { Stripe, StripeCardElement } from "@stripe/stripe-js";

export const createPaymentMethod = async (
  stripe: Stripe,
  cardElement: StripeCardElement,
  username: string
) => {
  const res = await stripe!.createPaymentMethod({
    type: "card",
    card: cardElement!,
    billing_details: {
      name: username,
    },
  });
  console.log(res);
  return res["paymentMethod"];
};
