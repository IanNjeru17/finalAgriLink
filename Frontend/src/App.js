import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';
import FarmersDashboard from './components/FarmersDashboard';
import Products from './(pages)/products/Products';
import { AuthProvider } from './context/AuthContext'; 
import FarmerProductList from './components/FarmerProductList';
import ProductsList from './components/ProductsList';
import ErrorPage from './components/ErrorPage';
import Blog from './components/Blog';
import Logout from './components/Logout';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import Aboutus from './components/Aboutus';
import Dashboard from './pages/(customer)/dashboard/Dashboard';
import FarmerHome from './pages/(farmer)/dashboard/FarmerHome';
import AllProducts from './pages/(farmer)/product/AllProducts';
import Create from './pages/(farmer)/create-blog/Create';
import CustomerOrders from './pages/(customer)/orders/CustomerOrders';
import CustomerProfile from './pages/(customer)/profile/CustomerProfile';
import Myorders from './pages/(customer)/myorders/Myorders';
import FarmerProfile from './pages/(farmer)/profile/FarmerProfile';
import FarmersProducts from './components/my-products/FarmersProducts';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/farmer/Home" element={<FarmerHome />} />
            <Route path="/farmer/products" element={<AllProducts />} />
            <Route path="/farmer/create" element={<Create />} />
            <Route path="/farmer/profile" element={<FarmerProfile />} />
            <Route path="/farmer/my-products" element={<FarmersProducts />} />
            {/* customer? routes| */}
            <Route path="/customer/Home" element={<Dashboard />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/order" element={<CustomerOrders />} />
            <Route path="/customer/my-orders" element={<Myorders />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/farmer" element={<FarmersDashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/my-products" element={<FarmerProductList />} />
            <Route path="/all-products" element={<ProductsList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/createBlog" element={<CreateBlog />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
