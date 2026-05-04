import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyDetail from "./components/CompanyDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company/:id" element={<CompanyDetail />} />
    </Routes>
  );
}

export default App;
