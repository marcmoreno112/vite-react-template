import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./users/operations/loginUser/infrastructure/interfaces/ProtectedRoute";
import Dashboard from "./users/operations/loginUser/infrastructure/interfaces/dashboard/dashboard";
import LoginScreen from "./users/operations/loginUser/infrastructure/interfaces/layoutLogin/layoutLoginUser";
import { AuthProvider } from "./users/operations/loginUser/application/adapters/adapters";
import IlayoutImportExcel from "./excel/operations/importExcel/infrastructure/interfaces/IlayoutImportExcel ";

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
