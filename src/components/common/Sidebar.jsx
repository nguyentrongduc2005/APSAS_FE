import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/authStore.js";
import { NAV_BY_ROLE } from "../../constants/navConfig.js";

export default function Sidebar(){
  const { user } = useAuth();
  const items = NAV_BY_ROLE[user?.role] ?? [];
  return (
    <aside style={{background:"#0f1419",borderRight:"1px solid #202934",padding:18,width:240,color:"#eaf0f6"}}>
      <nav style={{display:"grid",gap:8}}>
        {items.map(it=>(
          <NavLink key={it.to} to={it.to}
            style={({isActive})=>({
              padding:"10px 12px",borderRadius:10,textDecoration:"none",
              background:isActive?"#11161b":"transparent",border:"1px solid #202934",color:"#eaf0f6",
              display:"flex",gap:8,alignItems:"center"
            })}
          >
            <span>{it.icon}</span> <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
