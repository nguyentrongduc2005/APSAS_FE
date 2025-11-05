import api from "./api";

// Tạm thời mock; khi có backend thì gọi api.post(...)
export async function login({email, password}) {
  // return (await api.post("/auth/login", {email, password})).data;
  return { ok: true, message: `Stub login: ${email}` };
}
export async function register(payload) {
  return { ok: true, message: `Stub register: ${payload.email}` };
}
export async function verifyOtp(code) {
  return { ok: true, message: `OTP submitted: ${code}` };
}
