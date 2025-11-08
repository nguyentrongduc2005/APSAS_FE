import AuthCard from "../../components/common/AuthCard.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Logo from "../../components/common/Logo.jsx";
import AuthTabs from "../../components/auth/AuthTabs.jsx";
import { useState } from "react";
import { login } from "../../services/authService.js";
import { useNavigate, useLocation } from "react-router-dom";


export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password }); // stub – trả message
    setMsg(res.message);
    const target = (res?.user?.role === "admin") ? "/admin/users" : "/dashboard";
    const back   = location.state?.from;
    navigate(back || target, { replace: true });
  };

  return (
    <div className="auth-wrap">
      <AuthCard>
        <Logo/>
        <p
          className="
            text-center text-[15px] leading-6
            text-slate-300/80
            mt-1 mb-3
          "
        >
          Nền tảng học lập trình trực tuyến
        </p>
        <AuthTabs/>
        <form onSubmit={submit}>
          <Input label="Email" type="email" placeholder="example@gmail.com"
                 value={email} onChange={e=>setEmail(e.target.value)} required/>
          <Input label="Mật khẩu" type="password" placeholder="••••••••"
                 value={password} onChange={e=>setPassword(e.target.value)} required/>
          <div className="helper"><a>Quên mật khẩu?</a></div>
          <button
            type="submit"
            className="
              w-full h-11 rounded-lg font-semibold text-white
              bg-blue-600 shadow
              transition-all duration-150 ease-out
              hover:bg-blue-500
              active:bg-blue-700 active:scale-[0.98] active:shadow-inner
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
            "
          >
            Đăng Nhập
          </button>
          <div className="hr"></div>
          <Button type="button" variant="muted">Đăng nhập với Google</Button>
          {msg && <div className="message">{msg}</div>}
        </form>
      </AuthCard>
    </div>
  );
}
