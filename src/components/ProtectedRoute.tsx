// src/components/ProtectedRoute.tsx
'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoggingOut } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Indique que le composant est monté
  }, []);

  useEffect(() => {
    if (isMounted && user === null && !isLoggingOut) {
      // Afficher la notification seulement si ce n'est pas une déconnexion manuelle
      toast.error('Vous devez vous connecter pour accéder à cette page.');
      router.push('/signin');
    }
  }, [user, isMounted, router, isLoggingOut]);

  if (!isMounted) {
    return null; // Ou afficher un indicateur de chargement
  }

  if (user === null) {
    return null; // L'utilisateur est redirigé vers la page de connexion
  }

  return <>{children}</>;
}
