import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from './components/register';
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import PrivateRoute from "./components/Routes/PrivateRoute";
import './styles.css';
import OneProduct from "./components/Home/onePRoduct"; // Ensure correct import
import ForgetPassword from './components/Login/Forgetpassword';
import Cart from './components/Cart';
import 'semantic-ui-css/semantic.min.css'; // Ensure Semantic UI CSS is imported
import SuccessPage from "./components/Status/success";
import CancelPage from "./components/Status/cancel";

function App() {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='/forgetpassword' element={<ForgetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<PrivateRoute />}>
                    <Route path="adminpanel" element={<AdminPanel />} />
                    <Route path="/edit" element={<AdminPanel />} />
                </Route>
                <Route path="/products/:id" element={<OneProduct />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
