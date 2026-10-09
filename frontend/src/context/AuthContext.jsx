import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('homelink_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('homelink_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('homelink_user', JSON.stringify(user));
      localStorage.setItem('homelink_token', token);
    } else {
      localStorage.removeItem('homelink_user');
      localStorage.removeItem('homelink_token');
    }
  }, [user, token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      const userData = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role,
        phone: res.phone,
      };
      setUser(userData);
      setToken(res.token);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      const userObj = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role,
        phone: res.phone,
      };
      setUser(userObj);
      setToken(res.token);
      return userObj;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Demo 1-Click Login helpers for college evaluations
  const loginAsDemoOwner = async () => {
    return await login('owner@homelink.com', 'Owner@123');
  };

  const loginAsDemoTenant = async () => {
    return await login('tenant@homelink.com', 'Tenant@123');
  };

  const isOwner = user?.role === 'ROLE_OWNER' || user?.role === 'ROLE_ADMIN';
  const isTenant = user?.role === 'ROLE_TENANT';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        loginAsDemoOwner,
        loginAsDemoTenant,
        isOwner,
        isTenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
