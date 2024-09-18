// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AUECChart from '../../components/AUECChart';
import AUECTable from '../../components/AUECTable';
import AddAUECForm from '../../components/AddAUECForm';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { user } = useAuth();

  // Initialiser les données AUEC à partir de localStorage ou avec des données par défaut
  const initialData = () => {
    const storedData = localStorage.getItem('auecData');
    return storedData
      ? JSON.parse(storedData)
      : {
          'Janvier': 120,
          'Février': 150,
          'Mars': 170,
          'Avril': 200,
          'Mai': 180,
          'Juin': 220,
        };
  };

  const [auecData, setAuecData] = useState<{ [key: string]: number }>(initialData());

  // Mettre à jour localStorage lorsque les données AUEC changent
  useEffect(() => {
    localStorage.setItem('auecData', JSON.stringify(auecData));
  }, [auecData]);

  const handleAddAUEC = (month: string, auec: number) => {
    // Vérifier si le mois existe déjà
    if (auecData.hasOwnProperty(month)) {
      toast.error('Ce mois existe déjà. Veuillez choisir un autre mois.');
      return;
    }
    setAuecData((prevData) => ({ ...prevData, [month]: auec }));
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
        <p className="text-center mb-8">Bienvenue, {user?.name}!</p>
        <p className="text-center mb-8">Votre email : {user?.email}</p>

        <div className="mb-8">
          <AUECChart data={auecData} />
        </div>

        <div className="mb-8">
          <AUECTable data={auecData} />
        </div>

        <AddAUECForm onAdd={handleAddAUEC} />
      </div>
    </ProtectedRoute>
  );
}
