import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import SystemNotifications from "./components/SystemNotificatios";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SystemNotifications />} />
      </Routes>
    </div>
  );
}

export default App;
