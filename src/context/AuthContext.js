import React, { createContext, useState, useContext } from 'react';

// Simple mock auth context.
// Replace the login/signUp functions with real API calls to your backend
// (e.g. Firebase Auth, Supabase, or your own auth server) when ready.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // TODO: replace with real authentication call
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    const mockUser = { id: '1', email, username: email.split('@')[0] };
    setUser(mockUser);
    return mockUser;
  };

  const signUp = async (username, email, password) => {
    // TODO: replace with real account creation call
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }
    const mockUser = { id: Date.now().toString(), email, username };
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
