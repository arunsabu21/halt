import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/auth";
import HaltLogo from "../components/common/HaltLogo";
import PageLoader from "../components/common/PageLoader";
import { useToast } from "../hooks/useToast";
import getErrorMessage from "../utils/getErrorMessage";
import {
  validatePassword,
  validatePasswordMatch,
} from "../utils/registerValidators";

import "../styles/ResetPassword.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!token) {
      showToast("error", "Invalid or missing reset link.");
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [token, navigate, showToast]);

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToast("success", "Password reset successfully. You can now login.");
      navigate("/auth/login");
    },
    onError: (error) => {
      showToast(
        "error",
        getErrorMessage(error, "Password reset failed. Try again later."),
      );
    },
  });

  const runValidation = (name, value, allValues) => {
    if (name === "new_password") return validatePassword(value);
    if (name === "confirm_password") {
      return validatePasswordMatch(allValues.new_password, value);
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: runValidation(name, value, newFormData),
      }));
    }

    if (name === "new_password" && touched.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: validatePasswordMatch(
          value,
          newFormData.confirm_password,
        ),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: runValidation(name, value, formData),
    }));
  };

  const validateAll = () => {
    const newErrors = {
      new_password: validatePassword(formData.new_password),
      confirm_password: validatePasswordMatch(
        formData.new_password,
        formData.confirm_password,
      ),
    };
    setErrors(newErrors);
    setTouched({ new_password: true, confirm_password: true });
    return Object.values(newErrors).every((msg) => !msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    mutation.mutate({
      token,
      new_password: formData.new_password,
      confirm_password: formData.confirm_password,
    });
  };

  const renderField = (name, label) => {
    const hasError = touched[name] && errors[name];

    return (
      <div className="reset-password-field">
        <label htmlFor={name}>{label}</label>
        <div
          className={`reset-password-input-wrapper ${hasError ? "input-error" : ""}`}
        >
          <input
            id={name}
            name={name}
            type="password"
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

  if (!token) null;

  return (
    <>
      {mutation.isPending && <PageLoader />}
      <div className="reset-password-page">
        <div className="reset-password-box">
          <div className="reset-password-header">
            <Link to="/" className="reset-password-logo-link">
              <HaltLogo size="sm" />
            </Link>
          </div>

          <h1 className="reset-password-title">Set a new password</h1>
          <p className="reset-password-subtitle">
            Choose a strong password you haven't used before.
          </p>

          <form
            className="reset-password-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {renderField("new_password", "New Password")}
            {renderField("confirm_password", "Confirm Password")}

            <button
              type="submit"
              className="reset-password-button"
              disabled={mutation.isPending}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
