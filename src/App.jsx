import React from "react";
import AppRoutes from "./routes";

export default function App() {
  console.log("📱 App component RENDER");
  
  return (
    <div className="dark">
      <AppRoutes />
    </div>
  );
}
