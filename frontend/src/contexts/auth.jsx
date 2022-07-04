import React, { createContext, useState, useEffect } from "react";
import { createSession, createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

/*
export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    // const [user, setUser] = useState(null);
    let user = null;
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(false);
    },[]);

    const setUser= function (){
        user = JSON.parse(localStorage.getItem('user'));
    }

    const login = async (email, password) => {
        const response = await createSession(email,password);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser();
        const current_user = response.data.user;
        console.log(current_user);
        if (!current_user.isSubscribed) {
            navigate('/checkout');
        }else{
            navigate('/graph');
        }
    }
     
    const logout = () => {
        localStorage.removeItem('user');
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

}*/

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setUser] = useState(null);
  // let user = null;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));  
    if (currentUser) {
      if (!currentUser.isSubscribed) {
        navigate("/checkout");
      } else {
        navigate("/graph");
      }
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    setUser(response.data.user);
    
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const signupbut = () => {
    navigate("/signup");
  };

  const signup = async (email, password, name, tel) => {
    const response = await createUser(email, password, name, tel);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticaded: !!currentUser,
        currentUser,
        loading,
        login,
        logout,
        setUser,
        signup,
        signupbut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
