import React, { createContext, useState, useEffect } from 'react';
import { createSession, createUser } from '../services/api';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            setUser(JSON.parse(user));
        }
        setLoading(false);
    },[])
    const login = async (email, password) => {
        const response = await createSession(email,password);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/graph');
    }
     
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    
    const signupbut = () =>{
        navigate('/signup');
    }
    
    const signup = async (email, password, name, tel) =>{
        const response = await createUser(email, password, name, tel);
        navigate('/login')
    }

    return (
        <AuthContext.Provider
        value={{
            authenticaded: !!user,
            user,
            loading,
            login,
            logout,
            signup,
            signupbut
            }}>
        {children}
        </AuthContext.Provider>
    )

}
