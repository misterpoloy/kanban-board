import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import Board from "./components/Board";
import { DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if JWT exists

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // Exit if no valid destination
    console.log("Dragged from", source, "to", destination);
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/board" 
          element={isAuthenticated ? <Board onDragEnd={onDragEnd} /> : <Navigate to="/auth" />} 
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/board" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;
