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

  const [viewMode, setViewMode] = useState("list"); // "list" or "submissions"
  const [selectedStudentForSubmissions, setSelectedStudentForSubmissions] =
    useState(null);

  const selectedStudent = useMemo(
    () =>
      assignment?.students.find((student) => student.id === selectedStudentId),
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
    setDeadlineModal({
      open: false,
      date: assignment?.deadline ?? "",
      time: "23:59",
    });

  if (!assignment) {
    navigate("/lecturer/assignments", { replace: true });
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            {assignment.title}
          </h1>
          <p className="text-base text-gray-400">
            {lecturerCourseSummary.instructor}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-6">
        <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 text-white font-semibold text-xl">
            <FileText size={18} className="text-emerald-400" />
            Thông tin bài tập
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-emerald-400" />
              Hạn cuối:{" "}
              <span className="text-white font-medium">
                {assignment.deadline}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Timer size={16} className="text-emerald-400" />
              Tình trạng:{" "}
              <span className="text-white font-medium">
                {assignment.statusLabel}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Đã nộp:{" "}
              <span className="text-white font-medium">
                {assignment.submitted}/{assignment.total}
              </span>
            </span>
          </div>

          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-6 [&>ol]:pl-6 [&>code]:bg-[#0b0f12] [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-emerald-400"
            dangerouslySetInnerHTML={{ __html: assignment.description }}
          />

          <div className="space-y-4">
            <button
              type="button"
              onClick={openDeadlineModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#202934] text-white hover:border-emerald-500 hover:text-emerald-400 transition"
            >
              <PenSquare size={16} />
              Đặt deadline
            </button>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
          {viewMode === "list" ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Danh sách sinh viên
                </h3>
                <span className="text-sm text-muted-foreground">
                  {assignment.students.length} sinh viên
                </span>
              </div>

              {assignment.students.length ? (
                <div className="space-y-2">
                  {assignment.students.map((student) => {
                    const badge =
                      studentStatus[student.status] ?? studentStatus.missing;

                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between px-4 py-3 border-b border-[#202934] hover:bg-[#0b0f12] transition"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover bg-[#0b0f12]"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">
                              {student.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {student.class}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${badge.classes}`}
                          >
                            {badge.label}
                          </span>
                          <p className="text-sm text-white font-semibold min-w-[60px] text-right">
                            {student.score != null ? `${student.score}%` : "--"}
                          </p>

                          {student.status !== "missing" && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStudentForSubmissions(student);
                                setViewMode("submissions");
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition whitespace-nowrap"
                            >
                              Xem bài nộp ({student.submissionsCount})
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#202934] p-5 text-center text-gray-500">
                  Bài tập chưa có sinh viên nộp bài.
                </div>
              )}
            </>
          ) : (
            <>
              {/* Submissions Detail View */}
              <div className="space-y-6">
                {/* Back Button */}
                <button
                  onClick={() => {
                    setViewMode("list");
                    setSelectedStudentForSubmissions(null);
                  }}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Quay lại danh sách
                  </span>
                </button>

                {/* Student Header */}
                {selectedStudentForSubmissions && (
                  <>
                    <div className="flex items-center gap-4 pb-4 border-b border-[#202934]">
                      <img
                        src={selectedStudentForSubmissions.avatar}
                        alt={selectedStudentForSubmissions.name}
                        className="w-16 h-16 rounded-full object-cover bg-[#0b0f12]"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {selectedStudentForSubmissions.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {selectedStudentForSubmissions.class}
                        </p>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">
                          Điểm tốt nhất
                        </p>
                        <p className="text-2xl font-bold text-emerald-400">
                          {selectedStudentForSubmissions.bestScore}%
                        </p>
                      </div>
                      <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">
                          Runtime tốt nhất
                        </p>
                        <p className="text-2xl font-bold text-white">
                          {selectedStudentForSubmissions.bestRuntime}
                        </p>
                      </div>
                      <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">
                          Lần nộp cuối
                        </p>
                        <p className="text-sm font-semibold text-white mt-2">
                          {selectedStudentForSubmissions.lastSubmitted}
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedStudentForSubmissions.notes && (
                      <div className="bg-[#0b0f12] border border-[#202934] rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-white mb-2">
                          Ghi chú
                        </h4>
                        <p className="text-sm text-gray-400">
                          {selectedStudentForSubmissions.notes}
                        </p>
                      </div>
                    )}

                    {/* Submission Timeline */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">
                        Lịch sử nộp bài (
                        {selectedStudentForSubmissions.timeline.length})
                      </h4>
                      <div className="space-y-3">
                        {selectedStudentForSubmissions.timeline.map(
                          (entry, idx) => (
                            <div
                              key={idx}
                              onClick={() =>
                                navigate(
                                  `/lecturer/submissions/${
                                    entry.submissionId || `sub-${idx}`
                                  }`
                                )
                              }
                              className="flex items-start gap-4 p-4 bg-[#0b0f12] border border-[#202934] rounded-xl hover:border-emerald-500/50 transition cursor-pointer"
                            >
                              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 mt-2"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-semibold text-white">
                                    Lần nộp #
                                    {selectedStudentForSubmissions.timeline
                                      .length - idx}
                                  </p>
                                  <span className="text-xs text-gray-400">
                                    {entry.time}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  <span>
                                    Điểm:{" "}
                                    <span className="text-emerald-400 font-semibold">
                                      {entry.score}%
                                    </span>
                                  </span>
                                  <span>Runtime: {entry.runtime}</span>
                                  <span>Ngôn ngữ: {entry.language}</span>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    `/lecturer/submissions/${
                                      entry.submissionId || `sub-${idx}`
                                    }`
                                  );
                                }}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition"
                              >
                                Xem code
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Deadline Modal */}
      {deadlineModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeDeadlineModal}
          ></div>
          <div className="relative bg-[#0f1419] border border-[#202934] rounded-2xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Đặt deadline cho bài tập
                </h3>
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
                  setDeadlineModal((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-[#202934] bg-[#0b0f12] px-4 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm text-gray-400">Giờ deadline</label>
              <input
                type="time"
                value={deadlineModal.time}
                onChange={(e) =>
                  setDeadlineModal((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-[#202934] bg-[#0b0f12] px-4 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <button
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-600 transition"
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
