'use client'
import AuthLayout from "@/components/authLayout";
import Button from "@/components/button";
import Input from "@/components/input";
import { loginSchema, LoginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { login } from "../actions";
import ErrorMessage from "@/components/errorMessage";
import Link from "next/link";

export default function Login() {
  const { register, control, handleSubmit, setError, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const res = await login(data)
      const error = await res.error
      setError("root", { message: error.detail })
    } catch (error) {
      console.log("error:", error)
    }
  };

  const onError: SubmitErrorHandler<LoginSchema> = (data) => {
    console.log("erro:", data)
  }

  return (
    <AuthLayout title="Bem vindo!">
      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
      <form onSubmit={handleSubmit(handleLogin, onError)}
        className="flex flex-col gap-3 w-full"
      >
        <Input
          label="Email"
          type="email"
          register={register("email")}
          control={control}
        />
        <Input
          label="Senha"
          type="password"
          register={register("password")}
          control={control}
        />
        <Button type="submit">
          Entrar
        </Button>
      </form>
      <p>
        Não tem uma conta? <Link href={'/register'} className="text-primary hover:text-primaryHover cursor-pointer">
          Registre-se
        </Link>
      </p>
    </AuthLayout>
  );
}


