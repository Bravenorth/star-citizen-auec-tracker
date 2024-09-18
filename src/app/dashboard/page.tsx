// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function DashboardPage() {
  const [auecData, setAuecData] = useState<any>(null);

  // Fonction pour initialiser les données à partir de localStorage
  const initialData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('auecData');
      return storedData
        ? JSON.parse(storedData)
        : {
            // Données par défaut si 'auecData' n'est pas trouvé
            missions: [],
            rewards: [],
          };
    }
    return null;
  };

  useEffect(() => {
    // Initialiser les données lors du montage du composant
    const data = initialData();
    setAuecData(data);
  }, []);

  // Fonction pour mettre à jour les données et les stocker dans localStorage
  const updateAuecData = (newData: any) => {
    setAuecData(newData);
    localStorage.setItem('auecData', JSON.stringify(newData));
  };

  if (!auecData) {
    return <div>Chargement...</div>;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Votre contenu du dashboard ici */}
        {/* Exemple : */}
        <pre>{JSON.stringify(auecData, null, 2)}</pre>
      </div>
    </ProtectedRoute>
  );
}
