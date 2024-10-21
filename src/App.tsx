import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import Board from "./components/Board";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if JWT exists

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/board" 
          element={isAuthenticated ? <Board /> : <Navigate to="/auth" />} 
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/board" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;
