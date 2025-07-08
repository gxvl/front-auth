"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInFormSchema from "@/app/validations/signIn"; 
import z from "zod";
import { useState, useEffect } from "react"; 
import InputField from "@/app/components/InputField/inputField";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Button from "@/app/components/Button/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/providers/auth";
import LoadingComponent from "@/app/components/Loading/loading";

type SignInForm = z.infer<typeof SignInFormSchema>;

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid }, 
  } = useForm<SignInForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignInFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth(); 

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard'); 
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await fetch("/api/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        
        login(responseData.token, responseData.userName, responseData.userEmail);
        toast.success(responseData.message || "Login realizado com sucesso!");
        router.push("/dashboard"); 
      } else {
        
        toast.error(responseData.message || "Erro ao fazer login. Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro de rede/API:", error);
      toast.error("Ocorreu um erro de conexão. Tente novamente mais tarde.");
    }
  };

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center mt-72 h-full items-center">
      <div className="p-10 flex flex-col gap-5 justify-center items-center bg-gray-900 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl text-gray-50 font-semibold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
          <InputField
            name="email"
            type="email"
            placeholder="Insira aqui seu email..."
            label="E-mail"
            required
            register={register}
            formErrors={errors}
          />
          <InputField
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Insira aqui sua senha..."
            label="Senha"
            required
            register={register}
            formErrors={errors}
            suffixIcon={
              showPassword ? (
                <Eye className="cursor-pointer text-gray-400" onClick={() => setShowPassword(false)} size={20} />
              ) : (
                <EyeOff className="cursor-pointer text-gray-400" onClick={() => setShowPassword(true)} size={20} />
              )
            }
          />
          <Button
            type="submit"
            className="text-lg w-40 mt-4 self-center"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <div onClick={() => router.push('register')} className="px-2 cursor-pointer duration-300 transition-all py-1 hover:bg-gray-600 rounded">
          <p className="text-white">Cadastro</p>
        </div>
      </div>
    </div>
  );
}