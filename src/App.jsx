import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AccountLayout from "./layouts/AccountLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TripDetails from "./pages/TripDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import BoardingPointSelect from "./pages/BoardingPointSelect";
import PassengerDetails from "./pages/PassengerDetails";
import MyBookings from "./pages/account/MyBookings";
import MyBookingsDetails from "./pages/account/MyBookingsDetails";
import Profile from "./pages/account/Profile";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/trips/:tripId/seats" element={<TripDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/trips/:tripId/boarding"
              element={<BoardingPointSelect />}
            />
            <Route
              path="/bookings/confirmation"
              element={<BookingConfirmation />}
            />
            <Route
              path="/trips/:tripId/passengers"
              element={<PassengerDetails />}
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/verify-otp/:id" element={<VerifyOtp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AccountLayout />}>
            <Route path="/account/bookings" element={<MyBookings />} />
            <Route
              path="/account/bookings/:bookingId"
              element={<MyBookingsDetails />}
            />
            <Route path="/account/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
