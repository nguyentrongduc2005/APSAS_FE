import { Link, useLocation } from "react-router-dom";
export default function AuthTabs(){
  const loc = useLocation();
  const active = (p) => loc.pathname === p ? { background:"var(--accent)", borderColor:"var(--accent)", color:"#fff" } : {};
  const base = { flex:1, textAlign:"center", padding:"8px 10px", borderRadius:999, textDecoration:"none",
                 color:"var(--text)", border:"1px solid var(--border)", background:"#11161b" };
  return (
    <div style={{display:"flex", gap:8, marginBottom:12}}>
      <Link to="/auth/login" style={{...base, ...active("/auth/login")}}>Đăng nhập</Link>
      <Link to="/auth/register" style={{...base, ...active("/auth/register")}}>Đăng ký</Link>
    </div>
  );
}
