import React, { useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Editor = lazy(() => import("@monaco-editor/react"));
import {
  ArrowLeft,
  Play,
  Send,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function StudentAssignmentDetail() {
  const navigate = useNavigate();
  const { assignmentId } = useParams();

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

  // Mock data - TODO: Fetch from API
  const assignment = {
    id: assignmentId,
    title: "Implement Singly Linked List",
    descriptionHtml: `
      <h3>Yêu cầu:</h3>
      <p>Viết chương trình tạo một Singly Linked List với các thao tác cơ bản:</p>
      <ul>
        <li>Thêm node vào đầu danh sách</li>
        <li>Thêm node vào cuối danh sách</li>
        <li>Xóa node theo giá trị</li>
        <li>Tìm kiếm node</li>
        <li>In toàn bộ danh sách</li>
      </ul>
      <h3>Input:</h3>
      <p>Một mảng các số nguyên</p>
      <h3>Output:</h3>
      <p>Danh sách liên kết đã được tạo và in ra theo format: <code>1 -> 2 -> 3 -> null</code></p>
    `,
    testCases: [
      { input: "[1, 2, 3, 4, 5]", output: "1 -> 2 -> 3 -> 4 -> 5 -> null" },
      { input: "[10, 20, 30]", output: "10 -> 20 -> 30 -> null" },
      { input: "[]", output: "null" },
    ],
  };

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

        <div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {assignment.title}
          </h1>

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
            <div
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: assignment.descriptionHtml }}
              style={{
                "--tw-prose-headings": "#fff",
                "--tw-prose-links": "#10b981",
                "--tw-prose-code": "#10b981",
              }}
            />
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
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-black rounded-lg hover:bg-emerald-600 transition font-medium"
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
