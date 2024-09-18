// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoggingOut: boolean; // Nouvel état
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      const storedExpiry = localStorage.getItem('expiry');
      if (storedUser && storedExpiry) {
        const parsedExpiry = parseInt(storedExpiry, 10);
        if (Date.now() < parsedExpiry) {
          return JSON.parse(storedUser);
        } else {
          // Session expirée
          localStorage.removeItem('user');
          localStorage.removeItem('expiry');
          return null;
        }
      }
    }
    return null;
  });

  const [expiry, setExpiry] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const storedExpiry = localStorage.getItem('expiry');
      if (storedExpiry) {
        return parseInt(storedExpiry, 10);
      }
    }
    return null;
  });

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false); // Nouvel état

  useEffect(() => {
    if (user && expiry) {
      // Définir un timeout pour déconnecter l'utilisateur à l'expiration
      const timeout = setTimeout(() => {
        logout(false); // Passer false pour indiquer que ce n'est pas une déconnexion manuelle
        toast.info('Votre session a expiré. Veuillez vous reconnecter.');
      }, expiry - Date.now());

      return () => clearTimeout(timeout);
    }
  }, [user, expiry]);

  const login = (userData: User) => {
    setUser(userData);
    const sessionDuration = 60 * 60 * 1000; // 1 heure
    const sessionExpiry = Date.now() + sessionDuration;
    setExpiry(sessionExpiry);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('expiry', sessionExpiry.toString());
    toast.success('Connexion réussie !');
  };

  const logout = (manual: boolean = true) => { // Ajouter un paramètre pour indiquer le type de déconnexion
    setIsLoggingOut(manual); // Mettre à jour l'état de déconnexion manuelle
    setUser(null);
    setExpiry(null);
    localStorage.removeItem('user');
    localStorage.removeItem('expiry');
    router.push('/');
    if (manual) {
      toast.success('Déconnexion réussie !');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggingOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
