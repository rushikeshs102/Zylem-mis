import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../src/component/Dashboard";
import SalesAnalysis from "../src/component/pages/SalesAnalysis";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route index element={<SalesAnalysis />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
