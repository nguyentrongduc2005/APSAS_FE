// src/pages/auth/Login.jsx
import AuthCard from "../../components/common/AuthCard.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Logo from "../../components/common/Logo.jsx";
import AuthTabs from "../../components/auth/AuthTabs.jsx";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsError(false);
    setIsSubmitting(true);

    try {
      const user = await login({
        email: form.email.trim(),
        password: form.password,
      });

      setMsg("Đăng nhập thành công!");

      // Điều hướng theo role, hoặc về trang trước đó
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        const role = user?.role;
        if (role === "lecturer" || role === "teacher") {
          navigate("/lecturer/my-courses", { replace: true });
        } else if (role === "provider") {
          navigate("/resources", { replace: true });
        } else if (role === "admin") {
          navigate("/admin/users", { replace: true });
        } else {
          // mặc định student
          navigate("/student/my-courses", { replace: true });
        }
      }
    } catch (error) {
      setIsError(true);
      setMsg(error.message || "Đăng nhập thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthCard>
        <div className="space-y-6">
          <div className="text-center">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Nền tảng học lập trình trực tuyến
            </p>
          </div>

          <AuthTabs />

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <Input
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <div className="space-y-3">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              {msg && (
                <div
                  className={`text-sm text-center p-3 rounded-md ${
                    isError
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
                  }`}
                >
                  {msg}
                </div>
              )}
            </div>
          </form>
        </div>
      </AuthCard>
    </div>
  );
}
