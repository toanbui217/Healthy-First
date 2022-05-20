import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, []);

  return (
    <div className="app">
      <Router>
        {user.active ? (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;
