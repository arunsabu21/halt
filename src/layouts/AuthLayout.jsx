import { Outlet } from "react-router-dom";
import AuthNav from "../components/layout/AuthNav";

function AuthLayout() {
  return (
    <>
      <AuthNav />
      <Outlet />
    </>
  );
}

export default AuthLayout;
