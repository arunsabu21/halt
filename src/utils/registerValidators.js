export function validateFullName(value) {
    if (!value.trim()) return "Full name is required.";
    if (value.trim().length < 2) return "Full name is too short";

    return "";
}

export function validateEmail(value) {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";

    return "";
}

export function validatePhoneNumber(value) {
    if (!value.trim()) return "Phone number is required";
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) return "Enter a 10-digit phone number";

    return "";
}

export function validatePassword(value) {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "Include at least one number";

    return "";
}