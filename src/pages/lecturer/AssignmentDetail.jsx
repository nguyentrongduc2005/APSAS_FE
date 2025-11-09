import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Timer,
  FileText,
  ExternalLink,
  PenSquare,
  X,
} from "lucide-react";
import {
  lecturerAssignments,
  lecturerCourseSummary,
} from "../../constants/lecturerAssignments";

const studentStatus = {
  graded: { label: "Đã chấm", classes: "text-emerald-300 bg-emerald-500/10" },
  pending: { label: "Chờ duyệt", classes: "text-amber-300 bg-amber-500/10" },
  missing: { label: "Chưa nộp", classes: "text-gray-400 bg-white/5" },
};

const studentAccent = {
  graded: "bg-[#13271b] border border-emerald-500/20",
  pending: "bg-[#2a1f12] border border-amber-500/20",
  missing: "bg-[#2a1818] border border-red-500/20",
};

export default function LecturerAssignmentDetail() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backDestination = location.state?.from ?? "/lecturer/assignments";

  const assignment = useMemo(
    () => lecturerAssignments.find((item) => item.id === assignmentId),
    [assignmentId]
  );

  const [selectedStudentId, setSelectedStudentId] = useState(
    assignment?.students[0]?.id ?? null
  );

  const selectedStudent = useMemo(
    () => assignment?.students.find((student) => student.id === selectedStudentId),
    [assignment, selectedStudentId]
  );

  const [deadlineModal, setDeadlineModal] = useState({
    open: false,
    date: assignment?.deadline ?? "",
    time: "23:59",
  });

  useEffect(() => {
    if (!assignment) return;
    setSelectedStudentId(assignment.students[0]?.id ?? null);
    setDeadlineModal((prev) => ({
      ...prev,
      date: assignment.deadline ?? "",
    }));
  }, [assignment]);

  const openDeadlineModal = () =>
    setDeadlineModal({
      open: true,
      date: assignment?.deadline ?? "",
      time: "23:59",
    });

  const closeDeadlineModal = () =>
    setDeadlineModal({ open: false, date: assignment?.deadline ?? "", time: "23:59" });

  if (!assignment) {
    navigate("/lecturer/assignments", { replace: true });
    return null;
  }

  return (
    <div className="space-y-6 text-gray-100">
      <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(backDestination)}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Quay lại
            </button>
            <span className="text-gray-700">/</span>
            <span className="text-sm text-emerald-400 font-medium">
              {lecturerCourseSummary.title}
            </span>
          </div>
          <div className="text-sm text-blue-400 font-semibold">
            Tiến độ khóa học: {lecturerCourseSummary.progress}%
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400 font-semibold">
            Bài tập
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight">
            {assignment.title}
          </h1>
          <p className="text-base text-gray-400">
            {lecturerCourseSummary.instructor}
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,0.6fr)] xl:grid-cols-[minmax(0,4.5fr)_minmax(0,0.5fr)] items-start">
        <section className="bg-[#11141d] border border-[#1d2330] rounded-[28px] px-8 py-10 space-y-8 shadow-[0_25px_45px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-3 text-white font-semibold text-2xl tracking-tight">
            <FileText size={18} className="text-emerald-400" />
            Thông tin bài tập
          </div>

          <div className="flex flex-wrap gap-5 text-[1.05rem] text-gray-200 font-medium">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} /> Hạn cuối: {assignment.deadline}
            </span>
            <span className="flex items-center gap-2">
              <Timer size={16} /> Tình trạng: {assignment.statusLabel}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Đã nộp {assignment.submitted}/{assignment.total}
            </span>
          </div>

          <div
            className="space-y-5 text-[1.1rem] text-gray-100 leading-8 tracking-[0.01em] [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-6 [&>ol]:pl-6 [&>code]:bg-black/30 [&>code]:px-2 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-emerald-300"
            dangerouslySetInnerHTML={{ __html: assignment.description }}
          />

          <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
            <div className="space-y-4">
              <button
                type="button"
                onClick={openDeadlineModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 text-white hover:border-emerald-500 transition"
              >
                <PenSquare size={16} />
                Đặt deadline
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white">Tài nguyên</h4>
              {assignment.resources.length ? (
                <div className="space-y-3">
                  {assignment.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href="#"
                      className="flex items-center justify-between rounded-2xl border border-[#202934] bg-[#141923] px-4 py-3 hover:border-emerald-500 transition"
                    >
                      <div className="flex items-center gap-3 text-gray-200">
                        <FileText size={18} className="text-emerald-400" />
                        <div>
                          <p className="font-medium">{resource.label}</p>
                          <p className="text-xs text-gray-400">{resource.type}</p>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-500" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#202934] p-5 text-center text-gray-500">
                  Chưa có tài nguyên đính kèm.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="bg-[#11141d] border border-[#1d2330] rounded-[26px] p-6 space-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Danh sách sinh viên
              </h3>
              <span className="text-sm text-gray-400">
                {assignment.students.length} sinh viên
              </span>
            </div>

            {assignment.students.length ? (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#2a3441]">
                {assignment.students.map((student) => {
                  const badge = studentStatus[student.status] ?? studentStatus.missing;
                  const isActive = student.id === selectedStudentId;
                  const accent =
                    studentAccent[student.status] ??
                    "bg-[#0b0f12] border border-[#202934]";
                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`w-full rounded-2xl px-4 py-4 text-left transition ${accent} ${
                        isActive ? "ring-2 ring-emerald-400/40" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover bg-white/10"
                        />
                        <div className="flex-1">
                          <p className="text-base font-semibold text-white leading-tight">
                            {student.name}
                          </p>
                          <p className="text-[11px] uppercase tracking-wide text-gray-500">
                            {student.class}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge.classes}`}
                          >
                            {badge.label}
                          </span>
                          <p className="text-sm text-white font-semibold">
                            {student.score != null ? `${student.score}%` : "--"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                        Ưu tiên{" "}
                        <span className="font-semibold text-white">
                          {student.status === "missing"
                            ? "cao"
                            : student.status === "pending"
                            ? "trung bình"
                            : "thấp"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#202934] p-5 text-center text-gray-500">
                Bài tập chưa có sinh viên nộp bài.
              </div>
            )}
          </div>

          <div className="bg-[#170e10] border border-[#ff4558]/30 rounded-[26px] p-6 space-y-4 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
            {selectedStudent ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-12 h-12 rounded-full object-cover bg-white/10"
                  />
                  <div>
                    <p className="text-white font-semibold text-lg tracking-tight">
                      {selectedStudent.name}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {selectedStudent.class} • Bài nộp:{" "}
                      <span className="text-emerald-400 font-semibold">
                        {selectedStudent.submissionsCount}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 text-center">
                  <div className="rounded-xl border border-[#202934] p-4">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                      Điểm cao nhất
                    </p>
                    <p className="text-2xl font-bold text-emerald-400 leading-tight">
                      {selectedStudent.bestScore != null
                        ? `${selectedStudent.bestScore}%`
                        : "--"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#202934] p-4">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                      Runtime TB
                    </p>
                    <p className="text-2xl font-bold text-white leading-tight">
                      {selectedStudent.avgRuntime}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#202934] p-4">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                      Gần nhất
                    </p>
                    <p className="text-sm font-medium text-white">
                      {selectedStudent.lastSubmitted}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#202934] p-4">
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-2">
                    Ghi chú
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedStudent.note || "Không có ghi chú"}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Lịch sử nộp</h4>
                  {selectedStudent.timeline.length ? (
                    <div className="space-y-3">
                      {selectedStudent.timeline.map((log, idx) => (
                        <div
                          key={`${selectedStudent.id}-${idx}`}
                          className="rounded-xl border border-[#202934] p-4"
                        >
                          <div className="flex items-center justify-between text-[15px] text-gray-300">
                            <span className="font-semibold">{log.label}</span>
                            <span>{log.time}</span>
                          </div>
                          <p className="text-sm text-gray-400">{log.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#202934] p-5 text-center text-gray-500">
                      Sinh viên chưa nộp bài.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-[#202934] p-8 text-center text-gray-500">
                Chọn sinh viên để xem chi tiết bài nộp.
              </div>
            )}
          </div>
        </section>
      </div>

      {deadlineModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeDeadlineModal}
          ></div>
          <div className="relative bg-[#0f1419] border border-[#202934] rounded-2xl w-full max-w-md p-6 space-y-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Đặt deadline cho bài tập</h3>
                <p className="text-sm text-gray-400">{assignment.title}</p>
              </div>
              <button
                onClick={closeDeadlineModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-400">Ngày deadline</label>
              <input
                type="date"
                value={deadlineModal.date}
                onChange={(e) =>
                  setDeadlineModal((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full rounded-xl border border-[#202934] bg-transparent px-4 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm text-gray-400">Giờ deadline</label>
              <input
                type="time"
                value={deadlineModal.time}
                onChange={(e) =>
                  setDeadlineModal((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full rounded-xl border border-[#202934] bg-transparent px-4 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <button
              className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
              onClick={closeDeadlineModal}
            >
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
