import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/auth";
import HaltLogo from "../components/common/HaltLogo";
import PageLoader from "../components/common/PageLoader";
import { validateEmail } from "../utils/registerValidators";

import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      setSubmitted(true);
    },
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (touched) setError(validateEmail(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    setTouched(true);
    setError(validationError);
    if (validationError) return;

    mutation.mutate({ email });
  };

  const hasError = touched && error;

  return (
    <>
      {mutation.isPending && <PageLoader />}
      <div className="forgot-password-page">
        <div className="forgot-password-box">
          <div className="forgot-password-header">
            <Link to="/" className="forgot-password-logo-link">
              <HaltLogo size="sm" />
            </Link>
          </div>

          {submitted ? (
            <>
              <h1 className="forgot-password-title">Check your inbox</h1>
              <p className="forgot-password-subtitle">
                If an account exists for <strong>{email}</strong>, we've sent a
                password reset link. It expires shortly, so use it soon.
              </p>
              <Link
                to="/auth/login"
                className="forgot-password-button forgot-password-button-link"
              >
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <h1 className="forgot-password-title">Forgot your password?</h1>
              <p className="forgot-password-subtitle">
                Enter your email and we'll send you a reset link.
              </p>

              <form
                className="forgot-password-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="forgot-password-field">
                  <label htmlFor="email">Email</label>
                  <div
                    className={`forgot-password-input-wrapper ${hasError ? "input-error" : ""}`}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
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
                  {hasError && <p className="field-error-message">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="forgot-password-button"
                  disabled={mutation.isPending}
                >
                  Send Reset Link
                </button>
              </form>

              <p className="forgot-password-footer">
                Remembered your password? <Link to="/auth/login">Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
