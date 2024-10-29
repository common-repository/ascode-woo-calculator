import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AddNewCalculator from "./components/AddNewCalculator";
import CalculatorList from "./components/CalculatorList";
import EditCalculator from "./components/EditCalculator";

export default function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CalculatorList />} />
          <Route path="/add-calculator" element={<AddNewCalculator />} />
          <Route path="/edit-calulator/:id" element={<EditCalculator />} />
        </Routes>
      </HashRouter>
    </>
  );
}