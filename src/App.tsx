import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/login";
import ChapterPage from "pages/chapterPage";
import { AuthContextProvider } from "providers/authContextProvider";
import ResisterCardPage from "pages/registerCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripePubKey } from "constants/secret";

const stripePromise = loadStripe(stripePubKey);
const AppRoutes = () => {
  return (
    <AuthContextProvider>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chapter" element={<ChapterPage />} />
          <Route path="/register_card" element={<ResisterCardPage />} />
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
