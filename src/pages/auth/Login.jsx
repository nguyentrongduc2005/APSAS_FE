import AuthCard from "../../components/common/AuthCard.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Logo from "../../components/common/Logo.jsx";
import AuthTabs from "../../components/auth/AuthTabs.jsx";
import { useState } from "react";
// import { login } from "../../services/authService.js";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Login(){
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const submit = async (e) => {
//     e.preventDefault();
//     const res = await login({ email, password }); // stub – trả message
//     setMsg(res.message);
//     const target = (res?.user?.role === "admin") ? "/admin/users" : "/dashboard";
//     const back   = location.state?.from;
//     navigate(back || target, { replace: true });
//   };
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 1. Import hook

export default function Login() {
  const navigate = useNavigate();
  const { loginWithService, loginMock } = useAuth(); // 2. Lấy hàm từ Context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 3. Hàm login thật (gọi service)
  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      // 4. GỌI HÀM loginWithService
      // Service sẽ xử lý logic, sau đó context tự động refresh
      const result = await loginWithService({ email, password });

      // 5. Đăng nhập thành công, chuyển hướng dựa vào role
      const targetPath =
        result.user.role === "admin"
          ? "/admin/users"
          : result.user.role === "lecturer"
          ? "/lecturer/dashboard"
          : "/dashboard";

      navigate(targetPath, { replace: true });
    } catch (error) {
      // 6. Xử lý lỗi
      console.error("Đăng nhập thất bại:", error);
      setMsg(error.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Hàm login mock (không gọi API, để test)
  const submitMock = (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // Gọi hàm loginMock từ context
      const result = loginMock(email);

      // Chuyển hướng
      const targetPath =
        result.user.role === "admin"
          ? "/admin/users"
          : result.user.role === "lecturer"
          ? "/lecturer/dashboard"
          : "/dashboard";

      navigate(targetPath, { replace: true });
    } catch (error) {
      console.error("Mock login thất bại:", error);
      setMsg("Mock login thất bại");
    }
  };

  return (
    <div className="auth-wrap">
      <AuthCard>
        <Logo />
        <div className="sub">Nền tảng học lập trình trực tuyến</div>
        <AuthTabs />
        <form onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="helper">
            <a>Quên mật khẩu?</a>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </Button>

          {/* Nút Mock Login để test nhanh (tạm thời) */}
          <Button
            type="button"
            variant="outline"
            onClick={submitMock}
            style={{ marginTop: "10px" }}
          >
            Mock Login (Test)
          </Button>

          <div className="hr"></div>
          <Button type="button" variant="muted">
            Đăng nhập với Google
          </Button>
          {msg && (
            <div
              className="message"
              style={{ color: msg.includes("thất bại") ? "red" : "green" }}
            >
              {msg}
            </div>
          )}
        </form>
      </AuthCard>
    </div>
  );
}
