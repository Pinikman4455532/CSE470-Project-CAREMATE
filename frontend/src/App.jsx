import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Partner from "./pages/Partner";
import ImportantDates from "./pages/ImportantDates";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/partner" element={<Partner />} />
      <Route path="/important-dates" element={<ImportantDates />} />;

    </Routes>
  );
}

export default App;
