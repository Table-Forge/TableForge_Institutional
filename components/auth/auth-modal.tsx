"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  RegisterSchema,
  ILoginForm,
  IRegisterForm,
} from "@/schemas/auth.schema";
import { useAuth } from "@/context/auth-context";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flame, UserCheck, LogIn } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login, register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isLoginTab = authModalTab === "login";

  const loginForm = useForm<ILoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const registerForm = useForm<IRegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      nickname: "",
      email: "",
      password: "",
      birthDate: "2000-01-01",
    },
  });

  const onSubmitLogin = async (data: ILoginForm) => {
    try {
      setIsSubmitting(true);
      setAuthError(null);
      await login(data);
      loginForm.reset();
    } catch {
      setAuthError("Não foi possível autenticar. Verifique seus dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitRegister = async (data: IRegisterForm) => {
    try {
      setIsSubmitting(true);
      setAuthError(null);
      await registerUser(data);
      registerForm.reset();
    } catch {
      setAuthError("Erro ao registrar. O usuário ou e-mail já pode estar em uso.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={() => {
        setAuthError(null);
        closeAuthModal();
      }}
      title={isLoginTab ? "Entrar na Forja" : "Criar Conta de Aventureiro"}
      maxWidth="sm"
    >
      <div className="space-y-6">
        <div className="flex rounded-lg bg-[#000000] p-1 border border-[#2D2D2D]">
          <button
            type="button"
            onClick={() => {
              setAuthError(null);
              openAuthModal("login");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-colors ${
              isLoginTab
                ? "bg-[#ff2400] text-white"
                : "text-[#A1A1A1] hover:text-[#faf3e0]"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Entrar</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthError(null);
              openAuthModal("register");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-colors ${
              !isLoginTab
                ? "bg-[#ff2400] text-white"
                : "text-[#A1A1A1] hover:text-[#faf3e0]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Criar Conta</span>
          </button>
        </div>

        {authError && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-400 text-xs text-center">
            {authError}
          </div>
        )}

        {isLoginTab ? (
          <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
            <Input
              label="E-mail ou Usuário"
              placeholder="ex: aventureiro@email.com"
              error={loginForm.formState.errors.login?.message}
              {...loginForm.register("login")}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              error={loginForm.formState.errors.password?.message}
              {...loginForm.register("password")}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              <Flame className="w-4 h-4 fill-[#faf3e0]" />
              <span>{isSubmitting ? "Entrando..." : "Entrar na Taverna"}</span>
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="text-xs text-[#A1A1A1] hover:text-[#ff2400] transition-colors"
              >
                Ainda não tem conta? <span className="font-semibold text-[#faf3e0] underline">Cadastre-se na Forja</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className="space-y-3.5">
            <Input
              label="Nome de Usuário (@handle)"
              placeholder="ex: arthur_mestre"
              error={registerForm.formState.errors.username?.message}
              {...registerForm.register("username")}
            />

            <Input
              label="Apelido na Taverna"
              placeholder="ex: Arthur Pendelton"
              error={registerForm.formState.errors.nickname?.message}
              {...registerForm.register("nickname")}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={registerForm.formState.errors.email?.message}
              {...registerForm.register("email")}
            />

            <Input
              label="Data de Nascimento"
              type="date"
              error={registerForm.formState.errors.birthDate?.message}
              {...registerForm.register("birthDate")}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              error={registerForm.formState.errors.password?.message}
              {...registerForm.register("password")}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              <UserCheck className="w-4 h-4" />
              <span>{isSubmitting ? "Criando Conta..." : "Criar Minha Conta"}</span>
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="text-xs text-[#A1A1A1] hover:text-[#ff2400] transition-colors"
              >
                Já possui conta? <span className="font-semibold text-[#faf3e0] underline">Entrar agora</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
