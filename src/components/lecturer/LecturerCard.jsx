import React from "react";
import { Mail } from "lucide-react";
import avatar from "../../assets/logo.png"; // ảnh tạm

export default function LecturerCard() {
  return (
    <div className="flex items-center gap-4">
      <img
        src={avatar}
        alt="Lecturer"
        className="h-12 w-12 rounded-full bg-white/10 object-cover"
      />
      <div>
        <div className="font-semibold text-white">TS. Trần Minh Quân</div>
        <div className="text-slate-400 text-sm">Giảng viên Khoa CNTT</div>
        <div className="mt-1 text-sm text-slate-300 flex items-center gap-2">
          <Mail size={14} />{" "}
          <a href="mailto:minhquan@ut.edu.vn">minhquan@ut.edu.vn</a>
        </div>
        <div className="text-sm text-slate-300">4 khóa học • 8,900 SV</div>
      </div>
    </div>
  );
}
