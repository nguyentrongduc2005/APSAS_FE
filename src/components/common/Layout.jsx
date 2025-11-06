import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authStore";
import { NAV_BY_ROLE } from "../../constants/navConfig";
import { fetchMe, logout } from "../../services/authService";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const { user, token, loadFromStorage, clearAuth } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/auth/login", { replace: true });
        return;
      }
      const me = await fetchMe();
      if (!me) {
        clearAuth();
        navigate("/auth/login", { replace: true });
        return;
      }
      setReady(true);
    })();
  }, [token, clearAuth, navigate]);

  if (!ready) return null; // hoặc spinner

  const navItems = NAV_BY_ROLE[user?.role] ?? [];

  return (
    <div className="app-shell" style={{display:"grid", gridTemplateColumns:"240px 1fr", minHeight:"100vh", background:"#0b0f12", color:"#eaf0f6"}}>
      {/* Sidebar */}
      <aside style={{background:"#0f1419", borderRight:"1px solid #202934", padding:"18px"}}>
        <div style={{fontWeight:800, marginBottom:16, display:"flex", alignItems:"center", gap:8}}>
          <span style={{fontSize:20}}>&lt;/&gt;</span> APSAS
        </div>
        <nav style={{display:"grid", gap:8}}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}
              style={({isActive})=>({
                padding:"10px 12px", borderRadius:10, textDecoration:"none",
                background:isActive?"#11161b":"transparent", color:"#eaf0f6",
                border:"1px solid #202934", display:"flex", gap:8, alignItems:"center"
              })}
            >
              <span>{item.icon}</span> <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{display:"grid", gridTemplateRows:"56px 1fr"}}>
        {/* Header */}
        <header style={{display:"flex", alignItems:"center", justifyContent:"space-between",
                        padding:"0 16px", borderBottom:"1px solid #202934", background:"#0f1419"}}>
          <div style={{display:"flex", gap:12, alignItems:"center"}}>
            <input placeholder="Search..." style={{background:"#0d1217", border:"1px solid #202934", color:"#eaf0f6", padding:"8px 10px", borderRadius:8}}/>
          </div>
          <div style={{display:"flex", gap:12, alignItems:"center"}}>
            <span style={{fontSize:14, opacity:.8}}>{user?.name} • {user?.role}</span>
            <button onClick={()=>{ logout(); navigate("/auth/login"); }}
                    style={{background:"#3b82f6", color:"#fff", border:"none", borderRadius:8, padding:"8px 10px", cursor:"pointer"}}>
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{padding:20}}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer style={{padding:"12px 20px", borderTop:"1px solid #202934", opacity:.7, textAlign:"center"}}>
          © {new Date().getFullYear()} APSAS
        </footer>
      </div>
    </div>
  );
}
