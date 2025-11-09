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
            Tiếp tục
          </button>
          <div className="footer">
            <a>Gửi lại mã</a> • <a>Đổi email</a>
          </div>
          {msg && <div className="message">{msg}</div>}
        </form>
      </AuthCard>
    </div>
  );
}
