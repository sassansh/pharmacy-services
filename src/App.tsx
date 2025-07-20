import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Immunizations from "./pages/Immunizations";
import NavBar from "./components/NavBar";
import Prescribing from "./pages/Prescribing";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CssBaseline />
      <NavBar /> {/* ⬅️ always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="immunizations" element={<Immunizations />} />
        <Route path="prescribing" element={<Prescribing />} />
      </Routes>
    </BrowserRouter>
  );
}
