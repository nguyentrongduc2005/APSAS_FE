import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Editor = lazy(() => import("@monaco-editor/react"));
import {
  ArrowLeft,
  Play,
  Send,
  FileText,
  CheckCircle2,
  Clock,
  Calendar,
  Timer,
} from "lucide-react";
import studentCourseService from "../../services/studentCourseService";
import { marked } from "marked";

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function StudentAssignmentDetail() {
  const navigate = useNavigate();
  const { assignmentId, courseId } = useParams();

  // API state
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("practice"); // practice | submissions

  const defaultCode = {
    javascript:
      "// Viết code JavaScript của bạn ở đây\nfunction solution(input) {\n  // Your code here\n  return result;\n}\n",
    python:
      "# Viết code Python của bạn ở đây\ndef solution(input):\n    # Your code here\n    return result\n",
    java: "// Viết code Java của bạn ở đây\npublic class Solution {\n    public static String solution(String input) {\n        // Your code here\n        return result;\n    }\n}\n",
    cpp: "// Viết code C++ của bạn ở đây\n#include <iostream>\n#include <string>\nusing namespace std;\n\nstring solution(string input) {\n    // Your code here\n    return result;\n}\n",
  };

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
  };

  // Load assignment data from API
  useEffect(() => {
    const loadAssignmentData = async () => {
      try {
        setLoading(true);
        // Use the student course service method
        const response = await studentCourseService.getAssignmentDetail(courseId, assignmentId);
        
        if (response && (response.code === "ok" || response.code === "0")) {
          setAssignment(response.data);
        } else {
          throw new Error(response?.message || "Failed to load assignment");
        }
      } catch (err) {
        console.error('Error loading assignment:', err);
        setError(err.message || "Có lỗi xảy ra khi tải bài tập");
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId && courseId) {
      loadAssignmentData();
    }
  }, [assignmentId, courseId]);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");

    // Mock run code
    setTimeout(() => {
      setOutput(
        "Running code...\n\nTest case 1: Passed ✓\nTest case 2: Passed ✓\nTest case 3: Passed ✓"
      );
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Vui lòng viết code trước khi nộp bài!");
      return;
    }

    const confirmed = window.confirm("Bạn có chắc chắn muốn nộp bài?");
    if (confirmed) {
      // TODO: Call API to submit
      alert("Nộp bài thành công!");
      navigate(-1);
    }
  };

  // Mock submissions data
  const submissions = [
    {
      id: 1,
      submittedAt: "2024-03-15 14:30:00",
      language: "JavaScript",
      status: "passed",
      score: 100,
      testsPassed: 3,
      testsTotal: 3,
    },
    {
      id: 2,
      submittedAt: "2024-03-15 13:45:00",
      language: "Python",
      status: "failed",
      score: 66,
      testsPassed: 2,
      testsTotal: 3,
    },
    {
      id: 3,
      submittedAt: "2024-03-15 12:20:00",
      language: "JavaScript",
      status: "passed",
      score: 100,
      testsPassed: 3,
      testsTotal: 3,
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="h-8 bg-gray-700 rounded mb-4 w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-[#0f1419] border border-red-500/50 rounded-xl p-6 text-center">
          <div className="text-red-400 text-lg mb-2">Có lỗi xảy ra</div>
          <div className="text-gray-400 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // No assignment data
  if (!assignment) {
    return (
      <div className="space-y-6">
        <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 text-center">
          <div className="text-gray-400">Không tìm thấy bài tập</div>
        </div>
      </div>
    );
  }

  const isOverdue = assignment.dueAt && new Date(assignment.dueAt) < new Date();
  const isOpen = assignment.openAt && new Date(assignment.openAt) <= new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4"
        >
          <ArrowLeft size={18} />
          Quay lại
        </button>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {assignment.title}
              </h1>
              {assignment.summary && (
                <p className="text-gray-400 leading-relaxed">{assignment.summary}</p>
              )}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isOverdue 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : isOpen
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
            }`}>
              {isOverdue ? 'Hết hạn' : isOpen ? 'Đang mở' : 'Chưa mở'}
            </div>
          </div>

          {/* Assignment time info */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            {assignment.openAt && (
              <div className="flex items-center gap-2">
                <Timer size={16} />
                <span>Mở: {new Date(assignment.openAt).toLocaleString('vi-VN')}</span>
              </div>
            )}
            {assignment.dueAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Hạn: {new Date(assignment.dueAt).toLocaleString('vi-VN')}</span>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-[#202934]">
            <button
              onClick={() => setActiveTab("practice")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "practice"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Làm bài
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "submissions"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Bài nộp ({submissions.length})
            </button>
          </div>
        </div>
      </section>

      {activeTab === "practice" ? (
        <>
          {/* Description */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Đề bài</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {assignment.statementMd ? (
                <div
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: marked(assignment.statementMd),
                  }}
                />
              ) : (
                <div className="text-center py-8">
                  <FileText size={48} className="mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-400">Đề bài đang được cập nhật</p>
                </div>
              )}
            </div>
          </section>

          {/* Code Editor Section */}
          <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Code Editor</h2>

              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-4 py-2 bg-[#0b0f12] border border-[#202934] rounded-lg text-white focus:outline-none focus:border-emerald-500 transition"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Monaco Code Editor */}
            <div className="border border-[#202934] rounded-lg overflow-hidden">
              <Suspense
                fallback={
                  <div className="p-6 text-sm text-gray-400">Loading editor...</div>
                }
              >
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </Suspense>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={18} />
                {isRunning ? "Đang chạy..." : "Chạy code"}
              </button>

              <button
                onClick={handleSubmit}
                disabled={!code.trim() || !isOpen || isOverdue}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-black rounded-lg hover:bg-emerald-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                Nộp bài
              </button>
            </div>

            {/* Output */}
            {output && (
              <div className="mt-4 p-4 bg-[#0b0f12] border border-[#202934] rounded-lg">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Output:
                </h3>
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            )}
          </section>

          {/* Test Cases Section */}
          {assignment.testCases && assignment.testCases.length > 0 && (
            <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Test Cases</h2>

              <div className="space-y-3">
                {assignment.testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className="bg-[#0b0f12] border border-[#202934] rounded-lg p-4 space-y-3"
                  >
                    <div className="text-sm font-semibold text-emerald-400">
                      Test Case {index + 1}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-2">Input:</div>
                        <div className="p-3 bg-[#0f1419] border border-[#202934] rounded-lg">
                          <code className="text-sm text-white font-mono">
                            {testCase.input}
                          </code>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-2">
                          Expected Output:
                        </div>
                        <div className="p-3 bg-[#0f1419] border border-[#202934] rounded-lg">
                          <code className="text-sm text-white font-mono">
                            {testCase.output}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        /* Submissions Tab */
        <section className="bg-[#0f1419] border border-[#202934] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Lịch sử nộp bài
          </h2>

          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() =>
                  navigate(`/student/submissions/${submission.id}`)
                }
                className="bg-[#0b0f12] border border-[#202934] rounded-lg p-4 hover:border-emerald-500/50 transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                          submission.status === "passed"
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-red-400 bg-red-500/10"
                        }`}
                      >
                        {submission.status === "passed" ? (
                          <>
                            <CheckCircle2 size={14} />
                            Đạt
                          </>
                        ) : (
                          <>
                            <FileText size={14} />
                            Không đạt
                          </>
                        )}
                      </span>
                      <span className="text-sm text-gray-400">
                        {submission.language}
                      </span>
                      <span className="text-sm text-gray-500">
                        {submission.testsPassed}/{submission.testsTotal} test
                        cases
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={14} />
                      {submission.submittedAt}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">
                      {submission.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {submissions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-3 opacity-50" />
              <p>Chưa có bài nộp nào</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
