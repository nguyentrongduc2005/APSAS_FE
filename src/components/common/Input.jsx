export default function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <label style={{ fontSize: 12, color: "var(--muted)" }}>{label}</label>}
      <input {...props} style={{
        width: "100%", padding: "10px 12px", borderRadius: 10,
        background: "var(--field)", border: "1px solid var(--border)",
        color: "var(--text)"
      }}/>
    </div>
  );
}
