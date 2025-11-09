import AuthCard from "../../components/common/AuthCard.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Logo from "../../components/common/Logo.jsx";
import AuthTabs from "../../components/auth/AuthTabs.jsx";
import { useState } from "react";
import { register } from "../../services/authService.js";

export default function Register(){
  const [form, setForm] = useState({ email:"", password:"", confirmPassword:"" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    setMsg(res.message);
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
          <Input label="Email" type="email" value={form.email}
                 onChange={e=>setForm({...form, email:e.target.value})} required/>
          <Input label="Mật khẩu" type="password" value={form.password}
                 onChange={e=>setForm({...form, password:e.target.value})} required/>
          <Input label="Xác thực mật khẩu" type="password" value={form.confirmPassword}
                 onChange={e=>setForm({...form, confirmPassword:e.target.value})} required/>
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
            Đăng Ký
          </button>
          <div className="hr"></div>
          <Button type="button" variant="muted">Đăng ký với Google</Button>
          {msg && <div className="message">{msg}</div>}
        </form>
      </AuthCard>
    </div>
  );
}
