import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  console.log("using auth")
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signIn = () => {
    console.log('🔐 signIn() called - setting isSignedIn to true');
    setIsSignedIn(true);
  };

  const signOut = () => {
    console.log('🔓 signOut() called - setting isSignedIn to false');
    setIsSignedIn(false);
  };

  console.log('🏗️ AuthProvider render - isSignedIn:', isSignedIn);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}; 