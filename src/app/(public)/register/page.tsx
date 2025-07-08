"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import InputField from "@/app/components/InputField/inputField";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Button from "@/app/components/Button/button";
import { useRouter } from "next/navigation";
import SignUpFormSchema from "@/app/validations/signUp";

type SignUpForm = z.infer<typeof SignUpFormSchema>;

export default function RegisterPage() {

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignUpForm) => {
    // Note: o `samePassword` não é mais necessário aqui devido ao `.refine` no schema
    // e o `disabled` do botão será controlado por `isValid` ou `isSubmitting`.

    try {
      const response = await fetch("/api/register", { // Sua API de cadastro
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name, // Campo 'name'
          email: data.email, // Campo 'email'
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message || "Cadastro realizado com sucesso! Faça login.");
        router.push("/login"); // Redireciona para a página de login
      } else {
        // Exibe o erro retornado pela API
        toast.error(responseData.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de rede/API:", error);
      toast.error("Ocorreu um erro de conexão. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex w-full justify-center mt-72 h-full items-center">
      <div className="p-10 flex flex-col gap-5 justify-center items-center bg-gray-900 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl text-gray-50 font-semibold">Cadastro</h1>
        {/* Envolver os inputs e o botão de submit com o <form> e o handleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
          <InputField
            name="name" // Ajustado para 'name'
            type="text"
            placeholder="Insira aqui seu nome completo..."
            label="Nome Completo"
            required
            register={register}
            formErrors={errors}
          />
          <InputField
            name="email" // NOVO CAMPO: e-mail
            type="email"
            placeholder="Insira aqui seu e-mail..."
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
          <InputField
            name="passwordConfirmation"
            type={showPassword ? "text" : "password"}
            placeholder="Confirme sua senha..."
            label="Confirmação de Senha"
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
            loading={isSubmitting}
            disabled={isSubmitting || !isValid} 
          >
            Cadastrar
          </Button>
        </form>
        <div onClick={() => router.push('/login')} className="px-2 cursor-pointer duration-300 transition-all py-1 hover:bg-gray-600 rounded">
          <p className="text-white">Já possui uma conta? Faça login</p>
        </div>
      </div>
    </div>
  );
}