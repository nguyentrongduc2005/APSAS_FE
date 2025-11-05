import AuthCard from "../../components/common/AuthCard.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Logo from "../../components/common/Logo.jsx";
import AuthTabs from "../../components/auth/AuthTabs.jsx";
import { useState } from "react";
import { login } from "../../services/authService.js";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password }); // stub – trả message
    setMsg(res.message);
  };

  return (
    <div className="auth-wrap">
      <AuthCard>
        <Logo/>
        <div className="sub">Nền tảng học lập trình trực tuyến</div>
        <AuthTabs/>
        <form onSubmit={submit}>
          <Input label="Email" type="email" placeholder="example@gmail.com"
                 value={email} onChange={e=>setEmail(e.target.value)} required/>
          <Input label="Mật khẩu" type="password" placeholder="••••••••"
                 value={password} onChange={e=>setPassword(e.target.value)} required/>
          <div className="helper"><a>Quên mật khẩu?</a></div>
          <Button type="submit">Đăng Nhập</Button>
          <div className="hr"></div>
          <Button type="button" variant="muted">Đăng nhập với Google</Button>
          {msg && <div className="message">{msg}</div>}
        </form>
      </AuthCard>
    </div>
  );
}
