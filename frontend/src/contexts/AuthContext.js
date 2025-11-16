import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        try {
          setLoading(true);
          const response = await authAPI.getMe();
          setUser(response.data.user);
          setToken(savedToken);
          setError(null);
        } catch (error) {
          localStorage.removeItem('authToken');
          setUser(null);
          setToken(null);
          setError(error.response?.data?.message || 'Authentication failed');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      setToken(token);
      setLoading(false);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setUser(null);
      setToken(null);
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.signup(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      setToken(token);
      setLoading(false);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      setUser(null);
      setToken(null);
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
