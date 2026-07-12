import axiosInstance from "./axiosInstance";

export async function registerUser(payload) {
    const { data } = await axiosInstance.post("/auth/register/", payload);
    return data;
}

export async function verifyOTP(payload) {
    const { data } = await axiosInstance.post("/auth/verify-otp/", payload);
    return data;
}

export async function loginUser(payload) {
    const { data } = await axiosInstance.post("/auth/login/", payload);
    return data;
}

export async function logoutUser(refreshToken) {
    const { data } = await axiosInstance.post("/auth/logout/", {
        refresh: refreshToken,
    });

    return data;
}

export async function getCurrentUser() {
    const { data } = await axiosInstance.get("/auth/whoami/");
    return data;
}

export async function forgotPassword(payload) {
    const { data } = await axiosInstance.post("/auth/forgot-password/", payload);
    return data;
}

export async function resetPassword(payload) {
    const { data } = await axiosInstance.post("/auth/reset-password/", payload);
    return data;
}