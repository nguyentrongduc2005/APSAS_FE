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
          
          <form onSubmit={submit} className="space-y-4">
            <Input 
              className="text-primary"
              label="Email" 
              type="email" 
              placeholder="example@gmail.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} 
              required
            />
            <Input 
            className="text-primary"
              label="Mật khẩu" 
              type="password" 
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} 
              required
            />
            <Input 
            className="text-primary"
              label="Xác thực mật khẩu" 
              type="password" 
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={e => setForm({...form, confirmPassword: e.target.value})} 
              required
            />
            
            <div className="space-y-3">
              <Button type="submit">
                Đăng Ký
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
                </div>
              </div>
              
              <Button type="button" variant="outline text-primary">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Đăng ký với Google
              </Button>
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
