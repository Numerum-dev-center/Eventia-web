import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./routes/ProtectedRoute";


import { Outlet, Navigate } from "react-router-dom";


import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";








import OrganizerLayout from "./components/layout/organizer/organizerLayout";
import Dashboard from "./pages/organizer/OrganizerDashboard";
import EventsList from "./pages/organizer/EventsList";
import EventsCreate from "./pages/organizer/EventsCreate";
import EventsEdit from "./pages/organizer/EventsEdit";
import Participants from "./pages/organizer/EventsParticipants";
import Sessions from "./pages/organizer/Sessions";
import Stats from "./pages/organizer/Stats";
import Finances from "./pages/organizer/Finances";
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


        <Route path="dashboard" element={<Dashboard />} />


























        
        
        
       


<Route path="/organizer" element={<OrganizerLayout />}>
  <Route index element={<Navigate to="dashboard" replace />} />

  <Route path="dashboard" element={<Dashboard />} />

  {/* Liste des événements */}
  <Route path="events" element={<EventsList />} />

  {/* Création */}
  <Route path="events/create" element={<EventsCreate />} />

  {/* Détail événement */}
  <Route path="events/:id" element={<EventsDetails />} />

  {/* Actions d'un événement */}
  <Route path="events/:id/edit" element={<EventsEdit />} />

  <Route
    path="events/:id/participants"
    element={<Participants />}
  />

  <Route
    path="events/:id/sessions"
    element={<Sessions />}
  />

  <Route
    path="events/:id/stats"
    element={<Stats />}
  />

  <Route
    path="events/:id/finance"
    element={<EventsFinances />}
  />

  <Route
    path="events/:id/scan"
    element={<Scan />}
  />

  <Route
    path="events/:id/access"
    element={<AccessLog />}
  />

  {/* Finance globale */}
  <Route
    path="finance"
    element={<Finances />}
  />


  <Route
  path="settings"
  element={<OrganizerSettings />}
/>
</Route>

        





      </Routes>
    
  );
}

export default App;

