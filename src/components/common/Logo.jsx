// src/components/common/Logo.jsx
export default function Logo({ color = "#2F5BEA", size = 28 }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        marginBottom: 12,
      }}
      aria-label="APSAS"
    >
      <div style={{ fontWeight: 800, fontSize: size, color }}>{`</>`}</div>
      <div style={{ fontWeight: 800, letterSpacing: 0.5, color }}>APSAS</div>
    </div>
  );
}
