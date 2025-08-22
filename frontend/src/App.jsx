import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Partner from "./pages/Partner";
import ImportantDates from "./pages/ImportantDates";
import MemoryVault from "./pages/MemoryVault";
import PrivateNotes from "./pages/PrivateNotes";
import Mood from "./pages/Mood"; // adjust the path if needed

import GiftIdeas from "./pages/GiftIdeas"; // <-- import the new page

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

      <Route path="/gift-ideas" element={<GiftIdeas />} /> {/* <-- new route */}
    </Routes>
  );
}

export default App;
