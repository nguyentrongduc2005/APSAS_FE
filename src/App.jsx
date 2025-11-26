import React from "react";
import AppRoutes from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  console.log("📱 App component RENDER");
  
  return (
    <div className="dark">
      <AppRoutes />
      <Toaster />
    </div>
  );
}
