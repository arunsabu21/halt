import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import HaltLogo from "../components/common/HaltLogo";
import { useToast } from "../hooks/useToast";

import {
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../utils/registerValidators";
import "../styles/Register.css";

const VALIDATORS = {
  full_name: validateFullName,
  email: validateEmail,
  phone_number: validatePhoneNumber,
  password: validatePassword,
};

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showToast("success", "Registration successful. Check your email for the OTP.")
      // TODO: redirect to /verify-otp 
    },
    onError: (error) => {
      showToast("error", error.response?.data?.message || "Registration failed.")
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
    setTouched({
      full_name: true,
      email: true,
      phone_number: true,
      password: true,
    });
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
      <div className="register-field">
        <label htmlFor={name}>{label}</label>
        <div className={`register-input-wrapper ${hasError ? "input-error" : ""}`}>
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
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="7" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="1" fill="currentColor" />
            </svg>
          )}
        </div>
        {hasError && <p className="field-error-message">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-header">
          <Link to="/" className="register-logo-link">
            <HaltLogo size="sm" />
          </Link>
        </div>

        <h1 className="register-title">Create your account</h1>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {renderField("full_name", "Full Name")}
          {renderField("email", "Email", "email")}
          {renderField("phone_number", "Phone Number")}
          {renderField("password", "Password", "password")}

          <button type="submit" className="register-button" disabled={mutation.isPending}>
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;