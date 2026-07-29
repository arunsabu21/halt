import { Outlet } from "react-router-dom";
import AuthNav from "../components/layout/AuthNav";

function AuthLayout() {
  return (
    <>
      <div className="auth-nav-wrapper">
        <AuthNav />
      </div>

      <Outlet />
    </>
  );
}

export default AuthLayout;
