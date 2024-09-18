// src/app/signup/page.tsx
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .required('Mot de passe requis'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas') // Correction ici
    .required('Confirmer le mot de passe'),
});

export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignUpFormInputs) => {
    // Simuler une inscription réussie
    if (data.name && data.email && data.password) {
      login({ name: data.name, email: data.email });
      toast.success('Inscription réussie!');
      router.push('/dashboard');
    } else {
      toast.error('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">S'inscrire</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre nom complet"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirmez votre mot de passe"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Vous avez déjà un compte?{' '}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
