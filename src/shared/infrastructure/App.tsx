import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../routes/application/ProtectedRoute";
import { AuthProvider } from "../../context/application/loginContext";
import LoginScreen from "../../users/operations/loginUser/infrastructure/interfaces/layoutLogin/layoutLoginUser";
import Dashboard from "../../users/operations/loginUser/infrastructure/interfaces/dashboard/dashboard";
import IlayoutImportExcel from "../../excel/operations/importExcel/infrastructure/interfaces/IlayoutImportExcel";

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
