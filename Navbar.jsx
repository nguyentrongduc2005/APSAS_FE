import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="APSAS" className="h-20 w-auto" />
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link to="/courses" className="hover:text-emerald-400">Course</Link>
          <Link to="/contact" className="hover:text-emerald-400">Contact us</Link>
          <Link to="/signin"  className="hover:text-emerald-400">Sign in</Link>
        </nav>
      </div>
    </header>
  );
}
