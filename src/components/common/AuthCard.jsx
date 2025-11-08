export default function AuthCard({ children }) {
  return (
    <div
      className="
        w-full max-w-[380px]
        bg-[#171b22] border border-white/10
        p-6 rounded-2xl
        mx-auto my-10
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
      "
    >
      {children}
    </div>
  );
}
