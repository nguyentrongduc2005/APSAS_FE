import { useRef } from "react";
export default function OTPInput({ length=6, onChange }) {
  const refs = useRef([]);
  const onInput = (i, e) => {
    const v = e.target.value.replace(/\D/g,"").slice(0,1);
    e.target.value = v;
    if (v && refs.current[i+1]) refs.current[i+1].focus();
    onChange?.(refs.current.map(r=>r.value).join(""));
  };
  return (
    <div style={{display:"flex", gap:8, margin:"8px 0 14px"}}>
      {Array.from({length}).map((_,i)=>(
        <input key={i} ref={el => refs.current[i]=el}
               onInput={(e)=>onInput(i,e)} maxLength={1} inputMode="numeric"
               style={{width:44, textAlign:"center", fontSize:22, padding:"10px 0",
                       background:"var(--field)", border:"1px solid var(--border)",
                       color:"var(--text)", borderRadius:10}}/>
      ))}
    </div>
  );
}
