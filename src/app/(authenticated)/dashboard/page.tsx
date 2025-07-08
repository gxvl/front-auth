"use client"
import { useAuth } from "@/store/providers/auth";

export default function DashboardPage() {
    const { user } = useAuth();
  
  return (
    <div className="text-white w-full justify-center mt-40 items-center text-center">
      <p>Bem-vindo! Você está logado como:</p>
      <p className="font-bold mt-2 text-lg">{user?.name}</p>
      <p className="font-medium text-lg">({user?.email})</p>
      

    </div>
  )
}