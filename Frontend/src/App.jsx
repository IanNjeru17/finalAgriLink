import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import FarmerDashboard from "./components/FarmerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";


import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/farmer" 
            element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/customer" 
            element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} 
          />
          <Route path="/admin"  
            element={<ProtectedRoute role="customer"><AdminDashboard /></ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
