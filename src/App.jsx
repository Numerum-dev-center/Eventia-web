import { Routes, Route } from "react-router-dom";


import ProtectedRoute from "./routes/ProtectedRoute";


import { Navigate } from "react-router-dom";



import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import ResetPassword from "./pages/auth/Reset-password";
import AccessDenied from "./pages/AccessDenied";
import AdminLayout from "./components/layout/admin/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Events from "./pages/admin/Events";
import Finances from "./pages/admin/AFinances";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";




import OrganizerLayout from "./components/layout/organizer/organizerLayout";
import Dashboard from "./pages/organizer/OrganizerDashboard";
import EventsList from "./pages/organizer/EventsList";
import EventsCreate from "./pages/organizer/EventsCreate";
import EventsEdit from "./pages/organizer/EventsEdit";
import Participants from "./pages/organizer/EventsParticipants";
import Sessions from "./pages/organizer/Sessions";
import Stats from "./pages/organizer/Stats";
import EventsFinances from "./pages/organizer/EventsFinances";
import Scan from "./pages/organizer/Scan";
import AccessLog from "./pages/organizer/AccessLog";
import EventsDetails from "./pages/organizer/EventsDetails";
import OrganizerSettings from "./pages/organizer/OrganizerSettings";




import EventsParticipants from "./pages/organizer/EventsParticipants";


import EventsBrowse from "./pages/EventsBrowse";
import EventDetailsPublic from "./pages/EventDetailsPublic";



import Activate from "./pages/auth/Activate";
import AccountActivation from "./pages/auth/AccountActivation";



import { useEffect, useState } from "react";







function App() {



  
  const [darkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  








  return (
  
      <Routes>

        <Route path="/account-activation" element={<AccountActivation />} />
        <Route path="/auth/activate" element={<AccountActivation />} />

        <Route path="/activate" element={<Activate />} />
        
        <Route path="/" element={<EventsBrowse />} />
        <Route path="/events" element={<EventsBrowse />} />
        <Route path="/events/:id" element={<EventDetailsPublic />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route path="forbidden" element={<AccessDenied />} />


























        
        
        
       


        <Route
          path="/organizer"
          element={
            <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
              <OrganizerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Liste des événements */}
          <Route
            path="events"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <EventsList />
              </ProtectedRoute>
            }
          />

          {/* Création */}
          <Route
            path="events/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <EventsCreate />
              </ProtectedRoute>
            }
          />

          {/* Détail événement */}
          <Route
            path="events/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <EventsDetails />
              </ProtectedRoute>
            }
          />

          {/* Actions d'un événement */}
          <Route
            path="events/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <EventsEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/participants"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <Participants />
              </ProtectedRoute>
            }
          />
          <Route
            path="events/:id/billets"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <EventsParticipants />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/sessions"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <Sessions />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/stats"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <Stats />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/finance"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <EventsFinances />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/scan"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <Scan />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/access"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <AccessLog />
              </ProtectedRoute>
            }
          />

          {/* Finance globale */}
          <Route
            path="finance"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <Finances />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "Organisateur"]}>
                <OrganizerSettings />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Navigate to="dashboard" replace />} />

  <Route path="dashboard" element={<AdminDashboard />} />

  <Route path="users" element={<Users />} />

  <Route path="events" element={<Events />} />

  <Route path="finance" element={<Finances />} />

  <Route path="reports" element={<Reports />} />

  <Route path="settings" element={<Settings />} />
</Route>
        





      </Routes>
    
  );
}

export default App;
