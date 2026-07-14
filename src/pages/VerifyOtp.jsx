import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { verifyOTP } from "../services/auth";
import HaltLogo from "../components/common/HaltLogo";
import { useToast } from "../hooks/useToast";
import { decodeIdToEmail } from "../utils/encoding";
import getErrorMessage from "../utils/getErrorMessage";

import "../styles/VerifyOtp.css";

const OTP_LENGTH = 6;

function VerifyOtp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const email = decodeIdToEmail(id);

  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("pending_verification_email");

    if (!email || !pendingEmail || email !== pendingEmail) {
      showToast("error", "Please register first to verify an account.");
      navigate("/auth/register", { replace: true });
      return;
    }
  }, [id, email, navigate, showToast]);

  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      sessionStorage.removeItem("pending_verification_email");
      showToast("success", "Email verified successfully.");
      navigate("/auth/login"); // Not exist page
    },
    onError: (error) => {
      showToast("error", getErrorMessage(error));

      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    },
  });

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) return;

    const newDigits = pasted.slice(0, OTP_LENGTH).split("");
    setDigits([...newDigits, ...Array(OTP_LENGTH - newDigits.length).fill("")]);
    inputRefs.current[Math.min(newDigits.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = digits.join("");

    if (otp.length !== OTP_LENGTH) {
      showToast("error", "Please enter the full 6-digit code.");
      return;
    }

    mutation.mutate({ email, otp });
  };

  if (!email) {
    navigate("/auth/register", { replace: true });
    return null;
  }

  return (
    <>
      <div className="verify-otp-page">
        <div className="verify-otp-box">
          <div className="verify-otp-header">
            <Link to="/" className="verify-otp-logo-link">
              <HaltLogo size="sm" />
            </Link>
          </div>

          <p className="verify-otp-subtitle">
            We sent a 6-digit code to <strong>{email}</strong>
          </p>

          <form className="verify-otp-form" onSubmit={handleSubmit}>
            <div className="otp-input-group" onPaste={handlePaste}>
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-digit-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              className="verify-otp-button"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Verifying..." : "Verify"}
            </button>
          </form>

          <p className="verify-otp-footer">
            Didn't get the code? <Link to="/auth/register">Register again</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default VerifyOtp;
