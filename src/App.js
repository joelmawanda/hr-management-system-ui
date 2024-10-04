import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdministratorDashboard from "./pages/AdministratorDashboard";
import LoginPage from "./pages/LoginPage";
import StaffRegistration from "./pages/StaffRegistration";
import StaffTable from "./pages/StaffTable";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/administrator-dashboard"
          element={<AdministratorDashboard />}
        />
        <Route
          path="/staff-register"
          element={<StaffRegistration />}
        />
        <Route
          path="/staff"
          element={<StaffTable />}
        />
      </Routes>
    </div>
  );
};

export default App;
