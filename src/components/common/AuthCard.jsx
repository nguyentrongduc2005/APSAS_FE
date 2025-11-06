export default function AuthCard({ children }) {
  return (
    <div style={{
      maxWidth: 380, width: "100%",
      background: "var(--panel)", border: "1px solid var(--border)",
      padding: 24, borderRadius: 16, margin: "40px auto",
      boxShadow: "0 10px 30px rgba(0,0,0,.35)"
    }}>
      {children}
    </div>
  );
}
