// src/pages/student/SubmissionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code2,
} from "lucide-react";
import submissionService from "../../services/submissionService";

export default function SubmissionDetail() {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubmission = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await submissionService.getSubmissionDetail(submissionId);

        // data là object chi tiết submission, map nhẹ lại cho FE
        setSubmission({
          id: data.id,
          assignmentTitle: data.assignmentTitle || data.assignmentName,
          courseName: data.courseName,
          language: data.language || "java",
          status: data.status, // PENDING / RUNNING / PASSED / FAILED...
          score: data.score ?? null,
          maxScore: data.maxScore ?? null,
          attemptNo: data.attemptNo,
          submittedAt: data.submittedAt,
          code: data.code,
          stdout: data.stdout,
          stderr: data.stderr,
          runtime: data.runtime,
          memory: data.memory,
        });
      } catch (err) {
        console.error("Error loading submission detail:", err);
        setError("Không thể tải thông tin bài nộp.");
      } finally {
        setLoading(false);
      }
    };

    if (submissionId) {
      loadSubmission();
    }
  }, [submissionId]);

  const renderStatusBadge = () => {
    if (!submission?.status) return null;

    const status = submission.status.toUpperCase();

    if (status === "PASSED" || status === "ACCEPTED") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium">
          <CheckCircle size={14} />
          Đạt
        </span>
      );
    }

    if (status === "FAILED" || status === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-300 text-xs font-medium">
          <XCircle size={14} />
          Không đạt
        </span>
      );
    }

    if (status === "PENDING" || status === "RUNNING") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-xs font-medium">
          <Clock size={14} />
          Đang chấm
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-500/10 text-slate-300 text-xs font-medium">
        <AlertTriangle size={14} />
        {submission.status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <p className="text-gray-400 text-sm">Đang tải chi tiết bài nộp...</p>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-2"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>

        <div className="bg-[#0f1419] border border-red-500/40 text-red-300 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle size={20} />
          <span>{error || "Không tìm thấy thông tin bài nộp."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm"
      >
        <ArrowLeft size={16} />
        Quay lại
      </button>

      {/* Header */}
      <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Bài nộp #{submission.id}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {submission.assignmentTitle || "Chi tiết bài nộp"}
            </h1>
            {submission.courseName && (
              <p className="text-gray-400 text-sm mt-1">
                Khóa học: {submission.courseName}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            {renderStatusBadge()}
            {submission.submittedAt && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={14} />
                <span>Đã nộp: {submission.submittedAt}</span>
              </div>
            )}
          </div>
        </div>

        {/* Score + attempt */}
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
          {submission.score != null && (
            <div>
              <span className="text-gray-400">Điểm: </span>
              <span className="font-semibold text-emerald-400">
                {submission.score}
                {submission.maxScore ? ` / ${submission.maxScore}` : ""}
              </span>
            </div>
          )}
          {submission.attemptNo != null && (
            <div>
              <span className="text-gray-400">Lần nộp: </span>
              <span className="font-semibold">{submission.attemptNo}</span>
            </div>
          )}
          {submission.language && (
            <div>
              <span className="text-gray-400">Ngôn ngữ: </span>
              <span className="font-semibold uppercase">
                {submission.language}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Code & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code */}
        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Code2 size={16} />
              <span>Source code</span>
            </div>
          </div>
          <div className="bg-[#05070a] border border-[#202934] rounded-lg p-3 overflow-auto max-h-[400px]">
            <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre">
              {submission.code || "// Không có source code"}
            </pre>
          </div>
        </div>

        {/* Result */}
        <div className="bg-[#0f1419] border border-[#202934] rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold text-white">Kết quả chấm</h2>

          {/* Runtime info */}
          {(submission.runtime || submission.memory) && (
            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              {submission.runtime && <span>Thời gian: {submission.runtime}</span>}
              {submission.memory && <span>Bộ nhớ: {submission.memory}</span>}
            </div>
          )}

          {/* Stdout */}
          <div>
            <p className="text-xs font-medium text-gray-300 mb-1">Output</p>
            <div className="bg-[#05070a] border border-[#202934] rounded-lg p-3 max-h-40 overflow-auto">
              <pre className="text-xs text-gray-100 whitespace-pre-wrap">
                {submission.stdout || "Không có output."}
              </pre>
            </div>
          </div>

          {/* Stderr */}
          {submission.stderr && submission.stderr.trim() !== "" && (
            <div>
              <p className="text-xs font-medium text-red-300 mb-1">Error</p>
              <div className="bg-[#170909] border border-red-900/60 rounded-lg p-3 max-h-40 overflow-auto">
                <pre className="text-xs text-red-200 whitespace-pre-wrap">
                  {submission.stderr}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
