export default function Button({ variant="primary", ...props }) {
  const style = variant === "primary"
    ? { background: "var(--accent)", color: "#fff" }
    : { background: "var(--field)", color: "var(--text)", border: "1px solid var(--border)" };
  return <button {...props} style={{ ...style, width:"100%", padding:"10px 12px", borderRadius:10, fontWeight:600 }} />;
}
