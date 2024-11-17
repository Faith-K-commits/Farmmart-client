import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimalsPage from "./pages/AnimalsPage";
import AnimalDetailsPage from "./pages/AnimalDetailsPage";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/animal/:id" element={<AnimalDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
