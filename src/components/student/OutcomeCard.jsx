import React from "react";

export default function OutcomeCard() {
  return (
    <div className="card side">
      <h3 className="side-title">Kết quả học tập</h3>
      <ul className="bullets">
        <li>Hiểu cú pháp và cấu trúc cơ bản của Java</li>
        <li>Áp dụng OOP trong bài toán thực tế</li>
        <li>Sử dụng IDE như IntelliJ hoặc VSCode</li>
        <li>Thực hành với bài tập có phản hồi tự động</li>
      </ul>

      <div className="divider" />

      <h3 className="side-title">Yêu cầu đầu vào</h3>
      <ul className="bullets">
        <li>Không yêu cầu kiến thức trước</li>
        <li>Có máy tính cài Java 17+</li>
      </ul>
    </div>
  );
}
