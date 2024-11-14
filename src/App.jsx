// const App = () => {
//   return (
//     <div className="text-red-500 flex justify-center text-3xl mt-5 underline">
//       <h1>Test Continuous Integration</h1>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimalsPage from "./pages/AnimalsPage";
import AnimalDetailsPage from "./pages/AnimalDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalsPage />} />
        <Route path="/animal/:id" element={<AnimalDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
