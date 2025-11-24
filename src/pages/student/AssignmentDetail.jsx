// src/pages/student/AssignmentDetail.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Send,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import api from "../../services/api";

const Editor = lazy(() => import("@monaco-editor/react"));

const unwrap = (res) => res?.data?.data ?? res?.data ?? res;

export default function StudentAssignmentDetail() {
  const navigate = useNavigate();
  const { assignmentId } = useParams();

  // Trang
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Bài tập
  const [assignment, setAssignment] = useState(null);

  // Code editor
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");

  // Run code
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [runError, setRunError] = useState("");

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Lịch sử nộp bài
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // ==============================
  // 1) Load assignment + submissions từ BE
  // ==============================
  useEffect(() => {
    if (!assignmentId) return;

    const loadAll = async () => {
      try {
        setLoading(true);
        setLoadError("");

        // 1. Chi tiết assignment
        const assignmentRes = await api.get(
          `/student/assignments/${assignmentId}`
        );
        const assignmentData = unwrap(assignmentRes);

        setAssignment(assignmentData || null);
        setLanguage(assignmentData?.language || "java");
        setCode(assignmentData?.starterCode || "");

        // 2. Lịch sử submissions
        setLoadingSubmissions(true);
        try {
          const subsRes = await api.get(
            `/student/assignments/${assignmentId}/submissions`
          );
          const subsData = unwrap(subsRes);
          const list = subsData?.content ?? subsData ?? [];
          setSubmissions(Array.isArray(list) ? list : []);
        } finally {
          setLoadingSubmissions(false);
        }
      } catch (err) {
        console.error("Error loading assignment detail:", err);
        setLoadError("Không tải được thông tin bài tập.");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [assignmentId]);

  // ==============================
  // 2) Run code
  // ==============================
  const handleRunCode = async () => {
    if (!assignmentId) return;
    if (!code.trim()) {
      setRunError("Vui lòng nhập code trước khi chạy.");
      return;
    }

    setIsRunning(true);
    setRunError("");
    setRunResult(null);

    try {
      const res = await api.post(`/student/assignments/${assignmentId}/run`, {
        code,
        language,
      });
      const data = unwrap(res);
      setRunResult(data || null);
    } catch (err) {
      console.error("Run code error:", err);
      setRunError("Không thể chạy code. Vui lòng thử lại.");
    } finally {
      setIsRunning(false);
    }
  };

  // ==============================
  // 3) Submit code
  // ==============================
  const handleSubmitCode = async () => {
    if (!assignmentId) return;
    if (!code.trim()) {
      setSubmitError("Vui lòng nhập code trước khi nộp.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const res = await api.post(
        `/student/assignments/${assignmentId}/submit`,
        {
          code,
          language,
        }
      );
      const data = unwrap(res);
      setSubmitSuccess("Nộp bài thành công!");

      // Reload submissions sau khi nộp
      try {
        setLoadingSubmissions(true);
        const subsRes = await api.get(
          `/student/assignments/${assignmentId}/submissions`
        );
        const subsData = unwrap(subsRes);
        const list = subsData?.content ?? subsData ?? [];
        setSubmissions(Array.isArray(list) ? list : []);
      } finally {
        setLoadingSubmissions(false);
      }

      // Nếu BE trả kết quả, cũng hiển thị vào runResult
      if (data) {
        setRunResult(data);
      }
    } catch (err) {
      console.error("Submit code error:", err);
      setSubmitError("Không thể nộp bài. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==============================
  // 4) UI loading / lỗi
  // ==============================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <p className="text-gray-400 text-sm">Đang tải dữ liệu bài tập...</p>
      </div>
    );
  }

  if (loadError || !assignment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-6">
          <p className="text-red-400 text-sm">
            {loadError || "Không tìm thấy bài tập."}
          </p>
        </div>
      </div>
    );
  }

  // Gỡ dữ liệu ra từ assignment
  const {
    title,
    description,
    descriptionHtml,
    maxScore,
    skill,
    difficulty,
    estimatedTime,
  } = assignment;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>
          <span className="text-xs text-gray-500">
            Assignment ID: {assignmentId}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {title || "Bài tập"}
        </h1>

        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          {skill?.name && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300">
              <CheckCircle2 size={14} />
              {skill.name}
            </span>
          )}
          {difficulty && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300">
              Độ khó: {difficulty}
            </span>
          )}
          {estimatedTime && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300">
              <Clock size={14} />
              {estimatedTime} phút
            </span>
          )}
          {maxScore != null && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 text-gray-300">
              Điểm tối đa: {maxScore}
            </span>
          )}
        </div>
      </section>

      {/* Nội dung + code editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mô tả đề bài */}
        <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">
            Mô tả bài tập
          </h2>

          {descriptionHtml ? (
            <div
              className="prose prose-invert max-w-none text-sm text-gray-200"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : (
            <p className="text-sm text-gray-300 whitespace-pre-line">
              {description || "Đề bài chưa có mô tả chi tiết."}
            </p>
          )}
        </section>

        {/* Code editor */}
        <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">Code của bạn</h2>
            <div className="flex items-center gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs bg-[#05070a] border border-[#202934] text-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
              >
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>

          <div className="border border-[#202934] rounded-lg overflow-hidden h-[320px] bg-[#05070a]">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Đang tải editor...
                </div>
              }
            >
              <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={code}
                onChange={(val) => setCode(val ?? "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </Suspense>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            {runError && (
              <p className="text-xs text-red-400 mr-auto">{runError}</p>
            )}
            {submitError && (
              <p className="text-xs text-red-400 mr-auto">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-xs text-emerald-400 mr-auto">
                {submitSuccess}
              </p>
            )}

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#05070a] border border-[#202934] hover:border-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={16} />
              {isRunning ? "Đang chạy..." : "Chạy thử"}
            </button>
            <button
              onClick={handleSubmitCode}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              {isSubmitting ? "Đang nộp..." : "Nộp bài"}
            </button>
          </div>
        </section>
      </div>

      {/* Kết quả chạy gần nhất */}
      {runResult && (
        <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-white mb-2">
            Kết quả chạy
          </h2>
          <pre className="bg-[#05070a] border border-[#202934] rounded-lg p-3 text-xs text-gray-200 overflow-auto max-h-64">
            {JSON.stringify(runResult, null, 2)}
          </pre>
        </section>
      )}

      {/* Lịch sử nộp bài */}
      <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Lịch sử nộp bài
          </h2>
        </div>

        {loadingSubmissions ? (
          <p className="text-gray-400 text-sm">
            Đang tải lịch sử nộp bài...
          </p>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-3 opacity-50" />
            <p>Chưa có bài nộp nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#05070a] border border-[#202934]"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-white">
                    Lần nộp #{sub.attemptNo ?? sub.attempt ?? sub.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    {sub.submittedAt
                      ? new Date(sub.submittedAt).toLocaleString("vi-VN")
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {sub.status && (
                    <span
                      className={`px-2 py-1 rounded-full ${
                        sub.status === "PASSED" || sub.status === "ACCEPTED"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-yellow-500/10 text-yellow-300"
                      }`}
                    >
                      {sub.status}
                    </span>
                  )}
                  {sub.score != null && (
                    <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-300">
                      {sub.score}/{maxScore ?? 100} điểm
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
