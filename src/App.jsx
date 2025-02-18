import Home from "./pages/Home";
import About from "./pages/About";
import Supervisor from "./pages/Supervisor";
import Trainee from "./pages/Trainee";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import PrivateSupervisorRoute from "./utils/PrivateSupervisorRoute";
import PrivateTraineeRoute from "./utils/PrivateTraineeRoute";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route
              index
              element={
                <Home />
              }
            />
            <Route path="about" element={<About />} />
            <Route
              path="supervisor"
              element={
                <PrivateSupervisorRoute>
                  <Supervisor />
                </PrivateSupervisorRoute>
              }
            />
            <Route
              path="/supervisor/form/:id"
              element={
                <PrivateSupervisorRoute>
                  <Form />
                </PrivateSupervisorRoute>
              }
            />
            <Route
              path="trainee"
              element={
                <PrivateTraineeRoute>
                  <Trainee />
                </PrivateTraineeRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
