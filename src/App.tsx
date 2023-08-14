import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./pages/indexPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
