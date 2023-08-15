import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/login";
import ChapterPage from "pages/chapterPage";
import { AuthContextProvider } from "providers/authContextProvider";
import ResisterCardPage from "pages/registerCard";

const AppRoutes = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chapter" element={<ChapterPage />} />
        <Route path="/register_card" element={<ResisterCardPage />} />
      </Routes>
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
