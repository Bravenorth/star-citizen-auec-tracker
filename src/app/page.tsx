// src/app/page.tsx
'use client';

import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Bienvenue sur Star Citizen AUEC Tracker</h1>
      {user ? (
        <p>
          <Link href="/dashboard">Accéder au Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link href="/signin">Se connecter</Link> ou <Link href="/signup">S'inscrire</Link>
        </p>
      )}
    </div>
  );
}
