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
        <div className="sub">Nền tảng học lập trình trực tuyến</div>
        <AuthTabs/>
        <form onSubmit={submit}>
          <Input label="Email" type="email" value={form.email}
                 onChange={e=>setForm({...form, email:e.target.value})} required/>
          <Input label="Mật khẩu" type="password" value={form.password}
                 onChange={e=>setForm({...form, password:e.target.value})} required/>
          <Input label="Xác thực mật khẩu" type="password" value={form.confirmPassword}
                 onChange={e=>setForm({...form, confirmPassword:e.target.value})} required/>
          <Button type="submit">Đăng Ký</Button>
          <div className="hr"></div>
          <Button type="button" variant="muted">Đăng ký với Google</Button>
          {msg && <div className="message">{msg}</div>}
        </form>
      </AuthCard>
    </div>
  );
}
