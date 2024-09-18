// src/components/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} Star Citizen AUEC Tracker. Tous droits réservés.
      </div>
    </footer>
  );
}
