import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/verify-otp/:id" element={<VerifyOtp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
