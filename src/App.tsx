import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./users/operations/loginUser/interfaces/ProtectedRoute";
import Dashboard from "./users/operations/loginUser/interfaces/Dashboard";
import LoginScreen from "./users/operations/loginUser/interfaces/layoutLoginUser";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
