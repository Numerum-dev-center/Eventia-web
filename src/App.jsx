import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./routes/ProtectedRoute";


import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />


        





      </Routes>
    </BrowserRouter>
  );
}

export default App;

