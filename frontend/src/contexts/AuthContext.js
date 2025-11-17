// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  // Check if user is logged in on app start (cancellable)
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('authToken');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      // cancel previous controller if any
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        setLoading(true);
        const response = await authAPI.getMe({ signal: controller.signal });
        setUser(response.data.user || null);
        setToken(savedToken);
        setError(null);
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          // aborted — ignore
        } else {
          localStorage.removeItem('authToken');
          setUser(null);
          setToken(null);
          setError(err.response?.data?.message || 'Authentication failed');
        }
      } finally {
        setLoading(false);
        controllerRef.current = null;
      }
    };

    checkAuth();

    // cleanup on unmount
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      const { token: newToken, user: loggedUser } = response.data;

      localStorage.setItem('authToken', newToken);
      setUser(loggedUser);
      setToken(newToken);
      setLoading(false);

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
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
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('authToken', newToken);
      setUser(newUser);
      setToken(newToken);
      setLoading(false);

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setUser(null);
      setToken(null);
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    // cancel any outstanding auth request
    if (controllerRef.current) controllerRef.current.abort();

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
