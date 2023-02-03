import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Layout from "./components/Layout";
import List1 from "./components/List1";
import NoPage from "./components/Nopage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/list" element={<List1 />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
