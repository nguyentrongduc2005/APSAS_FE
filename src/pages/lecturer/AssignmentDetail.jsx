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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header Section */}
        <section className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(backDestination)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <ArrowLeft size={18} />
                Quay lại
              </button>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-primary font-medium">
                {lecturerCourseSummary.title}
              </span>
            </div>
            <div className="text-sm text-blue-400 font-semibold">
              Tiến độ khóa học: {lecturerCourseSummary.progress}%
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
              Bài tập
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              {assignment.title}
            </h1>
            <p className="text-base text-muted-foreground">
              {lecturerCourseSummary.instructor}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr] items-start">
          <section className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-foreground font-semibold text-xl">
              <FileText size={18} className="text-primary" />
              Thông tin bài tập
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="text-primary" /> 
                Hạn cuối: <span className="text-foreground font-medium">{assignment.deadline}</span>
              </span>
              <span className="flex items-center gap-2">
                <Timer size={16} className="text-primary" /> 
                Tình trạng: <span className="text-foreground font-medium">{assignment.statusLabel}</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" /> 
                Đã nộp: <span className="text-foreground font-medium">{assignment.submitted}/{assignment.total}</span>
              </span>
            </div>

            <div
              className="prose prose-invert max-w-none text-foreground leading-relaxed [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-6 [&>ol]:pl-6 [&>code]:bg-muted [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-primary"
              dangerouslySetInnerHTML={{ __html: assignment.description }}
            />

            <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={openDeadlineModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:border-primary hover:text-primary transition"
                >
                  <PenSquare size={16} />
                  Đặt deadline
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-semibold text-foreground">Tài nguyên</h4>
                {assignment.resources.length ? (
                  <div className="space-y-3">
                    {assignment.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href="#"
                        className="flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3 hover:border-primary transition"
                      >
                        <div className="flex items-center gap-3 text-foreground">
                          <FileText size={18} className="text-primary" />
                          <div>
                            <p className="font-medium">{resource.label}</p>
                            <p className="text-xs text-muted-foreground">{resource.type}</p>
                          </div>
                        </div>
                        <ExternalLink size={16} className="text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-5 text-center text-muted-foreground">
                    Chưa có tài nguyên đính kèm.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Danh sách sinh viên
                </h3>
                <span className="text-sm text-muted-foreground">
                  {assignment.students.length} sinh viên
                </span>
              </div>

              {assignment.students.length ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {assignment.students.map((student) => {
                    const badge = studentStatus[student.status] ?? studentStatus.missing;
                    const isActive = student.id === selectedStudentId;
                    const getAccentColors = (status) => {
                      switch (status) {
                        case 'graded':
                          return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
                        case 'pending':
                          return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
                        default:
                          return 'bg-muted border-border';
                      }
                    };
                    
                    return (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => setSelectedStudentId(student.id)}
                        className={`w-full rounded-xl px-4 py-3 text-left transition border ${getAccentColors(student.status)} ${
                          isActive ? "ring-2 ring-primary/40" : ""
                        } hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover bg-muted"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground leading-tight">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.class}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${badge.classes}`}
                            >
                              {badge.label}
                            </span>
                            <p className="text-sm text-foreground font-semibold mt-1">
                              {student.score != null ? `${student.score}%` : "--"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Ưu tiên:{" "}
                          <span className="font-medium text-foreground">
                            {student.status === "missing"
                              ? "Cao"
                              : student.status === "pending"
                              ? "Trung bình"
                              : "Thấp"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-5 text-center text-muted-foreground">
                  Bài tập chưa có sinh viên nộp bài.
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              {selectedStudent ? (
                <>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="w-12 h-12 rounded-full object-cover bg-muted"
                    />
                    <div>
                      <p className="text-foreground font-semibold text-lg">
                        {selectedStudent.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedStudent.class} • Bài nộp:{" "}
                        <span className="text-primary font-semibold">
                          {selectedStudent.submissionsCount}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 text-center">
                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Điểm cao nhất
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {selectedStudent.bestScore != null
                          ? `${selectedStudent.bestScore}%`
                          : "--"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Runtime TB
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {selectedStudent.avgRuntime}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Gần nhất
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {selectedStudent.lastSubmitted}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      Ghi chú
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedStudent.note || "Không có ghi chú"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-base font-semibold text-foreground">Lịch sử nộp</h4>
                    {selectedStudent.timeline.length ? (
                      <div className="space-y-3">
                        {selectedStudent.timeline.map((log, idx) => (
                          <div
                            key={`${selectedStudent.id}-${idx}`}
                            className="rounded-xl border border-border bg-muted/50 p-4"
                          >
                            <div className="flex items-center justify-between text-sm text-foreground">
                              <span className="font-semibold">{log.label}</span>
                              <span className="text-muted-foreground">{log.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{log.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-border p-5 text-center text-muted-foreground">
                        Sinh viên chưa nộp bài.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  Chọn sinh viên để xem chi tiết bài nộp.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Deadline Modal */}
        {deadlineModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={closeDeadlineModal}
            ></div>
            <div className="relative bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Đặt deadline cho bài tập</h3>
                  <p className="text-sm text-muted-foreground">{assignment.title}</p>
                </div>
                <button
                  onClick={closeDeadlineModal}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Ngày deadline</label>
                <input
                  type="date"
                  value={deadlineModal.date}
                  onChange={(e) =>
                    setDeadlineModal((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-foreground focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Giờ deadline</label>
                <input
                  type="time"
                  value={deadlineModal.time}
                  onChange={(e) =>
                    setDeadlineModal((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-foreground focus:border-primary outline-none"
                />
              </div>

              <button
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                onClick={closeDeadlineModal}
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
