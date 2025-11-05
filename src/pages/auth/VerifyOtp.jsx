import AuthCard from "../../components/common/AuthCard.jsx";
import Button from "../../components/common/Button.jsx";
import Logo from "../../components/common/Logo.jsx";
import OTPInput from "../../components/auth/OTPInput.jsx";
import { useState } from "react";
import { verifyOtp } from "../../services/authService.js";

export default function VerifyOtp(){
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await verifyOtp(code);
    setMsg(res.message);
  };

  return (
    <div className="auth-wrap">
      <AuthCard>
        <Logo/>
        <div className="sub">Nhập mã xác minh</div>
        <form onSubmit={submit}>
          <OTPInput length={6} onChange={setCode}/>
          <input type="hidden" value={code}/>
          <Button type="submit">Tiếp tục</Button>
          <div className="footer">
            <a>Gửi lại mã</a> • <a>Đổi email</a>
          </div>
          {msg && <div className="message">{msg}</div>}
        </form>
      </AuthCard>
    </div>
  );
}
