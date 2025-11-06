export default function Footer(){
  return (
    <footer style={{padding:"12px 20px",borderTop:"1px solid #202934",
                    background:"#0f1419",color:"#9aa5af",textAlign:"center"}}>
      © {new Date().getFullYear()} APSAS
    </footer>
  );
}
