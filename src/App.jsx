import Home from "./pages/Home";
import About from "./pages/About";
import Supervisor from "./pages/Supervisor";
import Trainee from "./pages/Trainee";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route
          index
          element={
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="supervisor" element={<Supervisor />} />
        <Route path="trainee" element={<Trainee />} />
        <Route path="/supervisor/form/:id" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
