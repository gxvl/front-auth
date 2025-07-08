// src/app/(authenticated)/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/providers/auth';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Carregando dados do usuário...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <header className="bg-gray-1000 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-100">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {user && <span className="text-gray-300">Bem-vindo, {user.name}!</span>}
          <button
            onClick={logout}
            className="px-4 py-2 cursor-pointer transition-all duration-300 bg-blue-400 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-8">
        {children}
      </main>
    </div>
  );
}