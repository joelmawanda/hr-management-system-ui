import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdministratorDashboard from "./pages/AdministratorDashboard";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/administrator-dashboard"
          element={<AdministratorDashboard />}
        />
      </Routes>
    </div>
  );
};

export default App;
