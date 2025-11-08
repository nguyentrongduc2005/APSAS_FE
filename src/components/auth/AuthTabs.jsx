import { NavLink } from "react-router-dom";

export default function AuthTabs() {
  const itemCls = (isActive) =>
    [
      "flex-1 h-10 rounded-full text-center leading-10 font-medium transition-all",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10",
      // trạng thái màu:
      isActive
        ? "bg-[#141414] text-white"        // ACTIVE: nền đen rất đậm + chữ trắng
        : "text-[#bfbfbf]"                 // INACTIVE: chữ xám nhạt, nền dùng khung
    ].join(" ");

  return (
    <div className="flex gap-0 mb-3
                    rounded-full p-1
                    bg-[#2b2b2b] border border-[#3a3a3a]">
      <NavLink end to="/auth/login"    className={({isActive}) => itemCls(isActive)}>
        Đăng nhập
      </NavLink>
      <NavLink     to="/auth/register" className={({isActive}) => itemCls(isActive)}>
        Đăng ký
      </NavLink>
    </div>
  );
}
