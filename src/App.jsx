import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../src/component/Dashboard";
import SalesAnalysis from "../src/component/SalesAnalysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* Nested routes will render inside the Outlet in the Dashboard component */}
          {/* <Route index element={<Navigate to="/sales-analysis" replace />} /> */}
          <Route path="sales-analysis" element={<SalesAnalysis />} />
          {/* You can add more nested routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
