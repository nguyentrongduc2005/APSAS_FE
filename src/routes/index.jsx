import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicCourses from '../pages/PublicCourses'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />
      <Route path="/courses" element={<PublicCourses />} />
      <Route
        path="*"
        element={
          <div className="container" style={{ padding: '40px 0' }}>
            <h2>404 — Not Found</h2>
          </div>
        }
      />
    </Routes>
  )
}
