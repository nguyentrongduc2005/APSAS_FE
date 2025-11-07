import api from "./api.js";
import { useAuth } from "../store/authStore.js";

export async function login({ email, password }) {
  const role = email.includes("admin") ? "admin"
             : email.includes("gv")    ? "lecturer" : "student";
  const data = { message: "Đăng nhập thành công", token: "dummy-token",
                 user: { id:"u1", name:"Nguyễn Văn A", email, role } };
  useAuth.getState().setAuth({ token: data.token, user: data.user });
  return data;
}
  export async function register({ name, email, password }) {
  // TODO: thay bằng api.post("/auth/register", { name, email, password })
  const data = { message: "Đăng ký thành công", token: "dummy-token",
                 user: { id:"u2", name: name || "User mới", email, role: "student" } };
  useAuth.getState().setAuth({ token: data.token, user: data.user });
  return data;
}

  export async function verifyOtp({ email, code }) {
  if (!code || String(code).length !== 6) {
    return { ok: false, message: "Mã OTP không hợp lệ" };
  }
  return { ok: true, message: "Xác minh thành công" };
}

export async function fetchMe() {
  const s = useAuth.getState();
  if (!s.token) return null;
  return s.user; // stub
}

export function logout(){ useAuth.getState().clear(); }
