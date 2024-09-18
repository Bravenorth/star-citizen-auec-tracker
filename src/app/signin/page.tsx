// src/app/signin/page.tsx
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface SignInFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères').required('Mot de passe requis'),
});

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignInFormInputs) => {
    // Simuler une authentification réussie
    if (data.email && data.password) {
      login({ name: 'Utilisateur', email: data.email });
      router.push('/dashboard');
    } else {
      toast.error('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Se connecter</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex. utilisateur@exemple.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre mot de passe"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Vous n'avez pas de compte?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
