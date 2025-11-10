import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock8,
  CheckCircle2,
  FileText,
  Link2,
  ExternalLink,
  Download,
  BookCheck,
  ListChecks,
  Play,
  SendHorizonal,
  GaugeCircle,
} from "lucide-react";
import * as assignmentService from "../../services/assignmentService";

const COURSE_TABS = [
  { key: "overview", label: "Tổng quan" },
  { key: "assignments", label: "Bài tập" },
];

const statusBadge = {
  completed: {
    text: "Hoàn thành",
    classes: "text-emerald-400 bg-emerald-500/10",
  },
  "in-progress": {
    text: "Đang làm",
    classes: "text-amber-400 bg-amber-500/10",
  },
  "not-started": {
    text: "Chưa bắt đầu",
    classes: "text-gray-400 bg-white/5",
  },
  pending: {
    text: "Chờ đánh giá",
    classes: "text-blue-300 bg-blue-500/10",
  },
};

export default function StudentAssignmentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assignmentId } = useParams();
  const backDestination = location.state?.from ?? "/student/my-courses";

  const [course, setCourse] = useState(null);
  const [assignmentList, setAssignmentList] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const [listLoading, setListLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [detailError, setDetailError] = useState(null);
  const [listReloadKey, setListReloadKey] = useState(0);
  const [detailReloadKey, setDetailReloadKey] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [codeByLanguage, setCodeByLanguage] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const fetchAssignments = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const response = await assignmentService.getStudentAssignments();
      const payload = response?.data ?? response ?? {};
      setCourse(payload.course ?? null);
      setAssignmentList(payload.assignments ?? []);
    } catch (error) {
      console.error("Không thể tải danh sách bài tập:", error);
      setAssignmentList([]);
      setListError(
        error?.response?.data?.message ||
          error?.message ||
          "Không thể tải danh sách bài tập"
      );
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments, listReloadKey]);

  useEffect(() => {
    if (!assignmentList.length) {
      setSelectedAssignmentId(null);
      return;
    }

    if (assignmentId) {
      const exists = assignmentList.some((item) => item.id === assignmentId);
      if (exists) {
        setSelectedAssignmentId(assignmentId);
        return;
      }
    }

    const fallbackId = assignmentList[0].id;
    setSelectedAssignmentId(fallbackId);
    if (!assignmentId || assignmentId !== fallbackId) {
      navigate(`/student/assignments/${fallbackId}`, {
        replace: true,
        state: { from: backDestination },
      });
    }
  }, [assignmentId, assignmentList, navigate, backDestination]);

  useEffect(() => {
    if (!selectedAssignmentId) {
      setAssignmentDetail(null);
      setSelectedLanguage(null);
      setCodeByLanguage({});
      return;
    }

    let cancelled = false;

    const fetchDetail = async () => {
      setDetailLoading(true);
      setDetailError(null);

      try {
        const response = await assignmentService.getStudentAssignmentDetail(
          selectedAssignmentId
        );
        if (cancelled) return;

        const payload = response?.data ?? response ?? {};
        setAssignmentDetail(payload.assignment ?? null);
        if (payload.assignment?.starterCode) {
          setCodeByLanguage((prev) => {
            const next = { ...payload.assignment.starterCode };
            Object.keys(prev || {}).forEach((lang) => {
              if (prev[lang] && !next[lang]) {
                next[lang] = prev[lang];
              }
            });
            return next;
          });
        } else {
          setCodeByLanguage({});
        }

        if (payload.course) {
          setCourse(payload.course);
        }

        const defaultLang =
          payload.assignment?.defaultLanguage ||
          payload.assignment?.languages?.[0] ||
          null;
        setSelectedLanguage(defaultLang);
      } catch (error) {
        if (cancelled) return;
        console.error("Không thể tải chi tiết bài tập:", error);
        setAssignmentDetail(null);
        setDetailError(
          error?.response?.data?.message ||
            error?.message ||
            "Không thể tải thông tin bài tập"
        );
        setSelectedLanguage(null);
        setCodeByLanguage({});
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    };

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [selectedAssignmentId, detailReloadKey]);

  const scrollToSubmission = () => {
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      document
        .getElementById("student-submission")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleSelectAssignment = (id, opts = {}) => {
    if (!id) return;
    if (selectedAssignmentId !== id) {
      setSelectedAssignmentId(id);
      navigate(`/student/assignments/${id}`, {
        replace: false,
        state: { from: backDestination },
      });
    }
    if (opts.focusSubmission) {
      scrollToSubmission();
    }
  };

  const currentCourse = {
    title: course?.title ?? "Tên khóa học đang cập nhật",
    instructor: course?.instructor ?? "Đang cập nhật giảng viên",
    progress: course?.progress ?? 0,
  };

  const submission = assignmentDetail?.submission ?? {};
  const languages = assignmentDetail?.languages ?? [];
  const codeContent = selectedLanguage
    ? codeByLanguage?.[selectedLanguage] ?? ""
    : "";

  const sampleTests = assignmentDetail?.samples ?? [];
  const visibleTestCases = assignmentDetail?.testCases ?? [];

  const canRun = Boolean(
    selectedAssignmentId && selectedLanguage && codeContent.trim()
  );

  const handleCodeChange = (value) => {
    if (!selectedLanguage) return;
    setCodeByLanguage((prev) => ({
      ...prev,
      [selectedLanguage]: value,
    }));
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (codeByLanguage?.[lang] == null) {
      const starter =
        assignmentDetail?.starterCode?.[lang] ??
        assignmentDetail?.starterCode?.[
          assignmentDetail?.defaultLanguage || ""
        ] ??
        "";
      setCodeByLanguage((prev) => ({ ...prev, [lang]: starter }));
    }
  };

  const handleRunCode = async () => {
    if (!canRun) return;
    setIsRunning(true);
    setRunResult(null);
    try {
      const response = await assignmentService.runAssignmentCode(
        selectedAssignmentId,
        {
          language: selectedLanguage,
          code: codeContent,
        }
      );
      setRunResult(response);
    } catch (error) {
      setRunResult({
        success: false,
        stdout: "",
        stderr:
          error?.response?.data?.message ||
          error?.message ||
          "Không thể chạy code. Vui lòng thử lại.",
        testResults: [],
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!canRun) return;
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const response = await assignmentService.submitAssignmentCode(
        selectedAssignmentId,
        {
          language: selectedLanguage,
          code: codeContent,
        }
      );
      setSubmitResult(response);
      setDetailReloadKey((prev) => prev + 1);
    } catch (error) {
      setSubmitResult({
        success: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Nộp bài không thành công.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
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
              Student Detail
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Tiến độ khóa học</span>
            <span className="text-blue-400 font-semibold">
              {currentCourse.progress}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-emerald-400 font-medium">
            {currentCourse.title}
          </p>
          <h1 className="text-3xl font-bold text-white">
            {assignmentDetail?.title ??
              assignmentList.find((item) => item.id === selectedAssignmentId)
                ?.title ??
              "Bài tập"}
          </h1>
          <p className="text-gray-400">{currentCourse.instructor}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {COURSE_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                tab.key === "assignments"
                  ? "bg-white/5 text-white border border-white/10"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Danh sách bài tập</h2>
          {listError && (
            <button
              type="button"
              onClick={() => setListReloadKey((prev) => prev + 1)}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Thử tải lại
            </button>
          )}
        </div>

        {listLoading ? (
          <div className="rounded-2xl border border-[#202934] p-6 text-gray-400">
            Đang tải danh sách bài tập...
          </div>
        ) : assignmentList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#202934] p-8 text-center text-gray-500">
            Chưa có bài tập nào trong khóa học này.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignmentList.map((assignment) => {
              const isActive = assignment.id === selectedAssignmentId;
              const badge =
                statusBadge[assignment.status] ?? statusBadge["not-started"];

              return (
                <article
                  key={assignment.id}
                  onClick={() => handleSelectAssignment(assignment.id)}
                  className={`rounded-2xl border cursor-pointer transition hover:-translate-y-0.5 ${
                    isActive
                      ? "border-emerald-500/70 bg-[#111821]"
                      : "border-[#202934] bg-[#0f1419]"
                  }`}
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-emerald-400">
                          Bài tập
                        </p>
                        <h3 className="text-lg font-semibold text-white">
                          {assignment.title}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${badge.classes}`}
                      >
                        {badge.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarDays size={16} />
                      <span>Deadline: {assignment.dueDate ?? "--"}</span>
                    </div>

                    {assignment.status === "completed" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-400 font-semibold">
                          Điểm: {assignment.score ?? "--"}%
                        </span>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleSelectAssignment(assignment.id, {
                              focusSubmission: true,
                            });
                          }}
                          className="px-4 py-2 rounded-lg border border-white/10 text-white text-sm hover:border-emerald-500 hover:text-emerald-300 transition"
                        >
                          Xem bài làm
                        </button>
                      </div>
                    )}

                    {assignment.status === "in-progress" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-amber-400 font-medium">
                          Đang làm
                        </span>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleSelectAssignment(assignment.id);
                          }}
                          className="px-4 py-2 rounded-lg bg-blue-500 text-black text-sm font-semibold hover:bg-blue-400 transition"
                        >
                          Tiếp tục
                        </button>
                      </div>
                    )}

                    {assignment.status === "not-started" && (
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Chưa bắt đầu</span>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleSelectAssignment(assignment.id);
                          }}
                          className="px-4 py-2 rounded-lg bg-blue-500 text-black text-sm font-semibold hover:bg-blue-400 transition"
                        >
                          Bắt đầu
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {detailError && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/5 text-red-200 p-5 flex items-center justify-between gap-4">
          <p className="text-sm">{detailError}</p>
          <button
            type="button"
            onClick={() => setDetailReloadKey((prev) => prev + 1)}
            className="text-sm font-medium underline decoration-dotted underline-offset-4 hover:text-red-100"
          >
            Thử lại
          </button>
        </div>
      )}

      {detailLoading && (
        <div className="rounded-2xl border border-[#202934] bg-[#0f1419] p-6 text-gray-400">
          Đang tải nội dung bài tập...
        </div>
      )}

      {!detailLoading && !assignmentDetail && !detailError && (
        <div className="rounded-2xl border border-dashed border-[#202934] p-8 text-center text-gray-500">
          Chọn một bài tập để xem chi tiết.
        </div>
      )}

      {assignmentDetail && (
        <>
          <section className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300">
                <ListChecks size={14} />
                {assignmentDetail.weight ?? "Không xác định"}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <CalendarDays size={16} />
                Hạn cuối: {assignmentDetail.dueDate ?? "--"}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Clock8 size={16} />
                Ước tính: {assignmentDetail.estimatedTime ?? "--"}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <CheckCircle2 size={16} />
                {assignmentDetail.attempt ?? "0 / 0 lần nộp"}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Đề bài</h3>
              {assignmentDetail.promptHtml ? (
                <div
                  className="space-y-4 text-gray-300 leading-relaxed [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-5 [&>ol]:pl-5 [&>code]:bg-black/30 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-emerald-300"
                  dangerouslySetInnerHTML={{
                    __html: assignmentDetail.promptHtml,
                  }}
                />
              ) : (
                <p className="text-gray-500 text-sm">
                  Đề bài đang được cập nhật.
                </p>
              )}
            </div>

            {assignmentDetail.constraints?.length ? (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">
                  Ràng buộc
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-300">
                  {assignmentDetail.constraints.map((constraint, idx) => (
                    <li key={idx} className="text-sm">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {sampleTests.length ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Ví dụ mẫu
                </h3>
                {sampleTests.map((sample) => (
                  <div
                    key={sample.id}
                    className="rounded-2xl border border-[#202934] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="font-medium text-white">
                        Test case {sample.id}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Input
                      </p>
                      <pre className="bg-black/40 rounded-lg p-3 text-sm text-gray-200 whitespace-pre-wrap">
                        {Array.isArray(sample.input)
                          ? sample.input.join("\n")
                          : sample.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Output
                      </p>
                      <pre className="bg-black/40 rounded-lg p-3 text-sm text-emerald-300 whitespace-pre-wrap">
                        {sample.output}
                      </pre>
                    </div>
                    {sample.explanation && (
                      <p className="text-sm text-gray-400">
                        Giải thích: {sample.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Tài nguyên</h3>
              {assignmentDetail.resources?.length ? (
                <div className="space-y-3">
                  {assignmentDetail.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.href || "#"}
                      className="flex items-center justify-between rounded-xl border border-[#202934] px-4 py-3 hover:border-emerald-500 transition"
                    >
                      <div className="flex items-center gap-3 text-gray-200">
                        <FileText size={18} className="text-emerald-400" />
                        <div>
                          <p className="font-medium">{resource.label}</p>
                          <p className="text-xs text-gray-400">
                            {resource.type}
                          </p>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-500" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#202934] p-5 text-center text-gray-500">
                  Chưa có tài nguyên nào được đính kèm.
                </div>
              )}
            </div>
          </section>

          <section
            id="student-submission"
            className="bg-[#0f1419] border border-[#202934] rounded-2xl p-6 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Trình soạn thảo
                  </h3>
                  <p className="text-sm text-gray-400">
                    Viết và chạy code trực tiếp – tương tự LeetCode workspace.
                  </p>
                </div>
                {languages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase">
                      Ngôn ngữ
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleLanguageChange(lang)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${
                            selectedLanguage === lang
                              ? "border-emerald-500 text-emerald-300 bg-emerald-500/10"
                              : "border-[#202934] text-gray-400 hover:text-white"
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#202934] overflow-hidden">
                <textarea
                  value={codeContent}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  placeholder="Bắt đầu viết code..."
                  className="w-full bg-[#05070a] text-gray-100 font-mono text-sm p-4 min-h-[320px] outline-none resize-y"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#202934] p-4">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleRunCode}
                      disabled={!canRun || isRunning}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:border-emerald-500 hover:text-emerald-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play size={16} />
                      {isRunning ? "Đang chạy..." : "Chạy thử"}
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitCode}
                      disabled={!canRun || isSubmitting}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SendHorizonal size={16} />
                      {isSubmitting ? "Đang nộp..." : "Nộp bài"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Mọi lần chạy đều lưu lại trong lịch sử bài nộp.
                  </p>
                </div>
              </div>

              {(runResult || submitResult) && (
                <div className="rounded-2xl border border-[#202934] p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <GaugeCircle size={18} className="text-emerald-400" />
                    Kết quả thực thi
                  </div>
                  {runResult && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Chạy thử</p>
                      <div
                        className={`rounded-xl border p-3 text-sm ${
                          runResult.success
                            ? "border-emerald-500/30 text-emerald-300"
                            : "border-red-500/40 text-red-300"
                        }`}
                      >
                        {runResult.success
                          ? runResult.message || "Passed sample tests."
                          : runResult.stderr || "Runtime error."}
                      </div>
                      {runResult.stdout && (
                        <pre className="bg-black/40 rounded-lg p-3 text-sm text-gray-200 whitespace-pre-wrap">
                          {runResult.stdout}
                        </pre>
                      )}
                      {runResult.testResults?.length ? (
                        <div className="space-y-2">
                          {runResult.testResults.map((test) => (
                            <div
                              key={test.id}
                              className="flex items-center justify-between text-sm text-gray-300 border border-[#202934] rounded-lg px-3 py-2"
                            >
                              <span>{test.label}</span>
                              <span
                                className={
                                  test.passed ? "text-emerald-400" : "text-red-400"
                                }
                              >
                                {test.passed ? "Passed" : "Failed"}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}

                  {submitResult && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Kết quả nộp bài</p>
                      <div
                        className={`rounded-xl border p-3 text-sm ${
                          submitResult.success
                            ? "border-emerald-500/30 text-emerald-300"
                            : "border-red-500/40 text-red-300"
                        }`}
                      >
                        {submitResult.message ||
                          (submitResult.success
                            ? "Nộp bài thành công."
                            : "Nộp bài thất bại.")}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Bài đã nộp
                </h3>
                <p className="text-sm text-gray-400">
                  Trạng thái:{" "}
                  {submission.status === "graded"
                    ? "Đã chấm điểm"
                    : submission.status === "draft"
                    ? "Bản nháp"
                    : submission.status === "pending"
                    ? "Đang chờ duyệt"
                    : "Chưa nộp"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:border-emerald-500 hover:text-emerald-300 transition flex items-center gap-2"
                >
                  <BookCheck size={16} />
                  Xem bài đã nộp
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-blue-500 text-black text-sm font-semibold hover:bg-blue-400 transition flex items-center gap-2"
                >
                  <Download size={16} />
                  Tải PDF
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#202934] p-4 space-y-2">
                <p className="text-sm text-gray-400">Thời gian nộp</p>
                <p className="text-lg font-semibold text-white">
                  {submission.submittedAt ?? "Chưa nộp"}
                </p>
                {submission.reviewedAt && (
                  <p className="text-xs text-gray-500">
                    Chấm vào {submission.reviewedAt}
                    {submission.reviewer ? ` bởi ${submission.reviewer}` : ""}
                  </p>
                )}
              </div>
              <div className="rounded-xl border border-[#202934] p-4 space-y-2">
                <p className="text-sm text-gray-400">Điểm</p>
                <p className="text-lg font-semibold text-emerald-400">
                  {submission.grade != null ? `${submission.grade}%` : "--"}
                </p>
                {submission.feedback && (
                  <p className="text-xs text-gray-500">
                    Nhận xét: {submission.feedback}
                  </p>
                )}
              </div>
            </div>

            {visibleTestCases.length ? (
              <div className="space-y-3">
                <h4 className="text-base font-semibold text-white">
                  Test case hệ thống
                </h4>
                <div className="space-y-2">
                  {visibleTestCases.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between rounded-xl border border-[#202934] px-4 py-3 text-sm text-gray-300"
                    >
                      <div className="flex items-center gap-2">
                        <Link2 size={16} className="text-emerald-400" />
                        <span>{test.label}</span>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          test.status === "passed"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : test.status === "pending"
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {test.status === "passed"
                          ? "Passed"
                          : test.status === "pending"
                          ? "Pending"
                          : "Locked"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-white">
                Lịch sử nộp
              </h4>
              {submission.history?.length ? (
                <div className="space-y-3">
                  {submission.history.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-xl border border-[#202934] p-4 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span className="font-semibold">{log.label}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-400">{log.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#202934] p-5 text-center text-gray-500">
                  Chưa có lịch sử nộp.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
