import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  isSignedIn: boolean;
  currentUser: User | null;
  signUp: (userData: User) => boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  isUserRegistered: (email: string) => boolean;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedSignInState = localStorage.getItem('isSignedIn');
    
    if (savedUser && savedSignInState === 'true') {
      setCurrentUser(JSON.parse(savedUser));
      setIsSignedIn(true);
      console.log('🔄 Restored auth state from localStorage');
    }
  }, []);

  const signUp = (userData: User): boolean => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if user already exists
      if (existingUsers.some((user: User) => user.email === userData.email)) {
        console.log('❌ User already exists with this email');
        return false;
      }
      
      // Add new user to registered users
      const updatedUsers = [...existingUsers, userData];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      // Sign the user in immediately after signup
      setCurrentUser(userData);
      setIsSignedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isSignedIn', 'true');
      
      console.log('✅ User signed up and signed in successfully');
      return true;
    } catch (error) {
      console.error('❌ Error during signup:', error);
      return false;
    }
  };

  const signIn = (email: string, password: string): boolean => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find((u: User) => u.email === email && u.password === password);
      
      if (user) {
        setCurrentUser(user);
        setIsSignedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isSignedIn', 'true');
        
        console.log('🔐 User signed in successfully');
        return true;
      } else {
        console.log('❌ Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('❌ Error during signin:', error);
      return false;
    }
  };

  const signOut = () => {
    console.log('🔓 signOut() called - clearing user session');
    setIsSignedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isSignedIn');
  };

  const isUserRegistered = (email: string): boolean => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      return registeredUsers.some((user: User) => user.email === email);
    } catch {
      return false;
    }
  };

  console.log('🏗️ AuthProvider render - isSignedIn:', isSignedIn, 'currentUser:', currentUser?.email);

  return (
    <AuthContext.Provider value={{ 
      isSignedIn, 
      currentUser, 
      signUp, 
      signIn, 
      signOut, 
      isUserRegistered 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 