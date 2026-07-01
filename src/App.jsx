import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./routes/ProtectedRoute";


import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";


import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/ui/admin/adminLayout";


import AdminEvents from "./pages/admin/AdminEvents";
import AdminBillets from "./pages/admin/AdminBillets";
import AdminCommissions from "./pages/admin/AdminCommissions";
import AdminReversements from "./pages/admin/AdminReversements";
import AdminReports from "./pages/admin/AdminReports";
import AdminAuditLog from "./pages/admin/AdminAuditLog";
import AdminSettings from "./pages/admin/AdminSettings";





function App() {
  return (
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route path="/organizerdashboard" element={<OrganizerDashboard />} />


        
        
        
        <Route path="/admin" element={<AdminLayout />}>

  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="events"
    element={<AdminEvents />}
  />

  <Route
    path="billets"
    element={<AdminBillets />}
  />

  <Route
    path="commissions"
    element={<AdminCommissions />}
  />

  <Route
    path="reversements"
    element={<AdminReversements />}
  />

  <Route
    path="reports"
    element={<AdminReports />}
  />

  <Route
    path="audit-log"
    element={<AdminAuditLog />}
  />

  <Route
    path="settings"
    element={<AdminSettings />}
  />

</Route>



        





      </Routes>
    
  );
}

export default App;

