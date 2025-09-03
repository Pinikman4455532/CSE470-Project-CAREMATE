import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Partner from "./pages/Partner";
import ImportantDates from "./pages/ImportantDates";
import MemoryVault from "./pages/MemoryVault";
import PrivateNotes from "./pages/PrivateNotes";
import Mood from "./pages/Mood"; // adjust the path if needed
import LoveLanguageQuiz from "./pages/LoveLanguageQuiz";
import AdminGuideline from "./pages/AdminGuideline";
import GiftIdeas from "./pages/GiftIdeas"; // <-- import the new page
import ComplimentGeneratorPage from "./pages/ComplimentGenerator";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/partner" element={<Partner />} />
      <Route path="/important-dates" element={<ImportantDates />} />
      <Route path="/memory-vault" element={<MemoryVault />} />
      <Route path="/private-notes" element={<PrivateNotes />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/admin-guidelines" element={<AdminGuideline />} />
      <Route path="/gift-ideas" element={<GiftIdeas />} /> {/* <-- new route */}
      <Route path="/compliment-generator" element={<ComplimentGeneratorPage />} />
      <Route path="/love-language-quiz" element={<LoveLanguageQuiz userId="123" partnerId="456" />} />
    </Routes>
  );
}

export default App;
