// src/components/ProtectedRoute.tsx
'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <div className={styles.container}><p>Chargement...</p></div>;
  }

  return <>{children}</>;
}
