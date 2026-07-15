import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import HaltLogo from "../components/common/HaltLogo";
import PageLoader from "../components/common/PageLoader";
import { useToast } from "../hooks/useToast";
import getErrorMessage from "../utils/getErrorMessage";
import {
  validateEmail,
  validateLoginPassword,
} from "../utils/registerValidators";

import "../styles/Login.css";

const VALIDATORS = {
  email: validateEmail,
  password: validateLoginPassword,
};

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      showToast("success", "Logged in successfully.");
      navigate("/");
    },
    onError: (error) => {
      showToast("error", getErrorMessage(error));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: VALIDATORS[name](value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: VALIDATORS[name](value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(VALIDATORS).forEach((field) => {
      newErrors[field] = VALIDATORS[field](formData[field]);
    });
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return Object.values(newErrors).every((msg) => !msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    mutation.mutate(formData);
  };

  const renderField = (name, label, type = "text") => {
    const hasError = touched[name] && errors[name];

    return (
      <div className="login-field">
        <label htmlFor={name}>{label}</label>
        <div className={`login-input-wrapper ${hasError ? "input-error" : ""}`}>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {hasError && (
            <svg
              className="input-error-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="7"
                x2="12"
                y2="13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16.5" r="1" fill="currentColor" />
            </svg>
          )}
        </div>
        {hasError && <p className="field-error-message">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <>
      {mutation.isPending && <PageLoader />}
      <div className="login-page">
        <div className="login-box">
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <HaltLogo size="sm" />
            </Link>
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Log in to manage your bookings.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {renderField("email", "Email", "email")}
            {renderField("password", "Password", "password")}

            <div className="login-forgot-row">
              <Link to="/auth/forgot-password" className="login-forgot-link">
                Forgot Password ?
              </Link>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={mutation.isPending}
            >
              Login
            </button>
          </form>

          <p className="login-footer">
            Don't have an account? <Link to="/auth/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
