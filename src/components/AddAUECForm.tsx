// src/components/AddAUECForm.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface AddAUECFormProps {
  onAdd: (month: string, auec: number) => void;
}

export default function AddAUECForm({ onAdd }: AddAUECFormProps) {
  const [month, setMonth] = useState('');
  const [auec, setAuec] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (month.trim() === '' || auec <= 0) {
      toast.error('Veuillez remplir tous les champs correctement.');
      return;
    }
    onAdd(month, auec);
    setMonth('');
    setAuec(0);
    toast.success('Nouvelle donnée AUEC ajoutée avec succès!');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Ajouter une nouvelle donnée AUEC</h2>
      <div className="mb-4">
        <label htmlFor="month" className="block text-gray-700 font-medium mb-2">
          Mois:
        </label>
        <input
          type="text"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Ex. Juillet"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="auec" className="block text-gray-700 font-medium mb-2">
          AUEC:
        </label>
        <input
          type="number"
          id="auec"
          value={auec}
          onChange={(e) => setAuec(parseInt(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Ex. 250"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Ajouter
      </button>
    </motion.form>
  );
}
