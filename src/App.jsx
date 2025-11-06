import React from "react";

import Footer from "./components/common/Footer";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="app-root">
      {/* <Header /> */}

      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
}
