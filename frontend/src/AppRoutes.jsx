import React, {useContext} from 'react';
import {
    BrowserRouter as Router, Route, Routes, Navigate
} from "react-router-dom";

import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import GraphPage from './pages/GraphPage';
import SignupPage from './pages/SignupPage';
import CheckoutPage from './pages/CheckoutPage';
import { AuthProvider, AuthContext } from './contexts/auth';

const AppRoutes = () => {
    const Private = ({children}) =>{
        const {authenticated, loading} = useContext(AuthContext);
        if (loading){
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated){
            return <Navigate to="/login" />
        }
        return children;
    }
    return ( 
        <Router>
            <AuthProvider>  
                <Routes>
                    <Route exact path='/' element={<Private><HomePage /></Private>} />
                    <Route exact path='/login' element={<LoginPage />} />
                    <Route exact path='/graph' element={<GraphPage />} />
                    <Route exact path='/signup' element={<SignupPage />} />
                    <Route exact path='/checkout' element={<CheckoutPage />} />
                    <Route exact path='/checkout/:cartCode' element={<HomePage />} />
                </Routes>
            </AuthProvider>  
        </Router>

     );
}
 
export default AppRoutes;