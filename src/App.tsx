import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/login";
import ChapterPage from "pages/chapterPage";
import { AuthContextProvider } from "providers/authContextProvider";
import PurchasePage from "pages/purchasePage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripePubKey } from "constants/secret";

const stripePromise = loadStripe(stripePubKey);

const options = {
  mode: "payment",
  amount: 200,
  currency: "jpy",
};

const AppRoutes = () => {
  return (
    <AuthContextProvider>
      <Elements stripe={stripePromise} options={options}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chapter" element={<ChapterPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
      </Elements>
    </AuthContextProvider>
  );
};

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
