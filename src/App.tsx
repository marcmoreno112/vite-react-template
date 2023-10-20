import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./users/operations/loginUser/infrastructure/interfaces/dashboard/dashboard";
import LoginScreen from "./users/operations/loginUser/infrastructure/interfaces/layoutLogin/layoutLoginUser";
import { AuthProvider } from "./context/loginContext";
import IlayoutImportExcel from "./excel/operations/importExcel/infrastructure/interfaces/IlayoutImportExcel";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/import-data"
          element={
            <ProtectedRoute>
              <IlayoutImportExcel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
