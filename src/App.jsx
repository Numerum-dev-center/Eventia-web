import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./routes/ProtectedRoute";


import { Outlet, Navigate } from "react-router-dom";


import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
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





import { useEffect, useState } from "react";







function App() {



  
  const [darkMode, setDarkMode] = useState(
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="forbidden" element={<AccessDenied />} />


























        
        
        
       


        <Route
          path="/organizer"
          element={
            <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
              <OrganizerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Liste des événements */}
          <Route
            path="events"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <EventsList />
              </ProtectedRoute>
            }
          />

          {/* Création */}
          <Route
            path="events/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <EventsCreate />
              </ProtectedRoute>
            }
          />

          {/* Détail événement */}
          <Route
            path="events/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <EventsDetails />
              </ProtectedRoute>
            }
          />

          {/* Actions d'un événement */}
          <Route
            path="events/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <EventsEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/participants"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <Participants />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/sessions"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <Sessions />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/stats"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <Stats />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/finance"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <EventsFinances />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/scan"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <Scan />
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/access"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <AccessLog />
              </ProtectedRoute>
            }
          />

          {/* Finance globale */}
          <Route
            path="finance"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <Finances />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "organisateur"]}>
                <OrganizerSettings />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
    path="/admin/*"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
        </ProtectedRoute>
    }
/>

<Route
    path="/organizer/*"
    element={
        <ProtectedRoute allowedRoles={["organisateur"]}>
            <OrganizerLayout />
        </ProtectedRoute>
    }
/>


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

