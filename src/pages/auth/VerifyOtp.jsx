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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthCard>
        <div className="space-y-6">
          <div className="text-center">
            <Logo />
            <h2 className="text-xl font-semibold mb-2 text-primary">Nhập mã xác minh</h2>
            <p className="text-sm text-muted-foreground">
              Chúng tôi đã gửi mã xác minh 6 chữ số đến email của bạn
            </p>
          </div>
          
          <form onSubmit={submit} className="space-y-6  text-primary">
            <OTPInput length={6} onChange={setCode} />
            <input type="hidden" value={code} />
            
            <Button type="submit">
              Tiếp tục
            </Button>
            
            <div className="flex items-center justify-center space-x-4 text-sm">
              <button 
                type="button"
                className="text-primary hover:underline"
              >
                Gửi lại mã
              </button>
              <span className="text-muted-foreground">•</span>
              <button 
                type="button"
                className="text-primary hover:underline"
              >
                Đổi email
              </button>
            </div>
            
            {msg && (
              <div className={`text-sm text-center p-3 rounded-md ${
                msg.includes("thất bại") || msg.includes("error")
                  ? "bg-destructive/10 text-destructive border border-destructive/20" 
                  : "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
              }`}>
                {msg}
              </div>
            )}
          </form>
        </div>
      </AuthCard>
    </div>
  );
}
