// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <Link href="/" className="text-2xl font-bold">
            Star Citizen AUEC Tracker
          </Link>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-200 transition-colors">
              Accueil
            </Link>
          </li>
          {user && (
            <li>
              <Link href="/dashboard" className="hover:text-gray-200 transition-colors">
                Dashboard
              </Link>
            </li>
          )}
          {!user ? (
            <>
              <li>
                <Link href="/signin" className="hover:text-gray-200 transition-colors">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-200 transition-colors">
                  S'inscrire
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Se déconnecter
              </button>
            </li>
          )}
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="md:hidden bg-blue-600 px-4 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <li className="border-b border-blue-500 py-2">
              <Link href="/" className="block hover:text-gray-200 transition-colors" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
            </li>
            {user && (
              <li className="border-b border-blue-500 py-2">
                <Link href="/dashboard" className="block hover:text-gray-200 transition-colors" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </li>
            )}
            {!user ? (
              <>
                <li className="border-b border-blue-500 py-2">
                  <Link href="/signin" className="block hover:text-gray-200 transition-colors" onClick={() => setIsOpen(false)}>
                    Se connecter
                  </Link>
                </li>
                <li className="border-b border-blue-500 py-2">
                  <Link href="/signup" className="block hover:text-gray-200 transition-colors" onClick={() => setIsOpen(false)}>
                    S'inscrire
                  </Link>
                </li>
              </>
            ) : (
              <li className="py-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Se déconnecter
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
