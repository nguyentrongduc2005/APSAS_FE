import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authStore.js";
import { fetchMe } from "../../services/authService.js";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

export default function ProtectedLayout(){
  const nav = useNavigate();
  const { token, load } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    (async () => {
      if (!token) { nav("/auth/login", { replace:true }); return; }
      const me = await fetchMe();
      if (!me) { nav("/auth/login", { replace:true }); return; }
      setReady(true);
    })();
  }, [token, nav]);

  if (!ready) return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",color:"#eaf0f6",background:"#0b0f12"}}>Đang tải…</div>;

  return (
    <div style={{display:"grid",gridTemplateColumns:"240px 1fr",minHeight:"100vh",background:"#0b0f12"}}>
      <Sidebar/>
      <div style={{display:"grid",gridTemplateRows:"56px 1fr auto"}}>
        <Header/>
        <main style={{padding:20, color:"#eaf0f6"}}><Outlet/></main>
        <Footer/>
      </div>
    </div>
  );
}
