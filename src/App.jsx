import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../src/component/Dashboard";
import SalesAnalysis from "../src/component/pages/SalesAnalysis";
import MainScreenPage from "./component/pages/MainScreenPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route path="/mainScreenPage" element={<MainScreenPage />} />
                    <Route path="/mainScreenPage/SalesAnalysisPage" element={<SalesAnalysis />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;