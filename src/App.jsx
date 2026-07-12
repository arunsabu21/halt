import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";

const HIDE_NAVBAR_ON = ["/register"]

function App() {
  const location = useLocation();
  const hideNavbar = HIDE_NAVBAR_ON.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
