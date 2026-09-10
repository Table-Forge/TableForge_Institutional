"use client";

import React, { useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  RegisterSchema,
  ILoginForm,
  IRegisterForm,
} from "@/schemas/auth.schema";
import { useAuth } from "@/context/auth-context";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/input-group/input-group";
import { Label } from "@/components/label/label";
import { ControlledInput } from "@/components/input/input.default.controlled";
import { PasswordInput } from "@/components/input/input.password";
import { PasswordRequirements } from "@/components/input/password-requirements";
import { DateInput } from "@/components/input/input.date.controlled";
import { Flame, UserCheck, LogIn } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login, register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isLoginTab = authModalTab === "login";

  const loginForm = useForm<ILoginForm>({
    resolver: zodResolver(LoginSchema) as Resolver<ILoginForm>,
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const registerForm = useForm<IRegisterForm>({
    resolver: zodResolver(RegisterSchema) as Resolver<IRegisterForm>,
    mode: "onChange",
    defaultValues: {
      username: "",
      nickname: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({
    control: registerForm.control,
    name: "password",
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
            <InputGroup>
              <Label htmlFor="login" isRequired>
                E-mail ou Usuário
              </Label>
              <ControlledInput
                hookForm={loginForm}
                name="login"
                placeholder="ex: aventureiro@email.com"
                error={loginForm.formState.errors.login?.message}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password" isRequired>
                Senha
              </Label>
              <PasswordInput
                hookForm={loginForm}
                name="password"
                placeholder="••••••••"
                error={loginForm.formState.errors.password?.message}
              />
            </InputGroup>

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
            <InputGroup>
              <Label htmlFor="username" isRequired>
                Nome de Usuário (@handle)
              </Label>
              <ControlledInput
                hookForm={registerForm}
                name="username"
                placeholder="ex: arthur_mestre"
                error={registerForm.formState.errors.username?.message}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="nickname" isRequired>
                Apelido na Taverna
              </Label>
              <ControlledInput
                hookForm={registerForm}
                name="nickname"
                placeholder="ex: Arthur Pendelton"
                error={registerForm.formState.errors.nickname?.message}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email" isRequired>
                E-mail
              </Label>
              <ControlledInput
                hookForm={registerForm}
                name="email"
                type="email"
                placeholder="seu@email.com"
                error={registerForm.formState.errors.email?.message}
                sanitizeEmail
                removeSpaces
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="birthDate" isRequired>
                Data de Nascimento
              </Label>
              <DateInput
                hookForm={registerForm}
                name="birthDate"
                placeholder="DD/MM/AAAA"
                error={registerForm.formState.errors.birthDate?.message}
                maxDate={new Date()}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password" isRequired>
                Senha
              </Label>
              <PasswordInput
                hookForm={registerForm}
                name="password"
                placeholder="Digite a senha"
                error={registerForm.formState.errors.password?.message}
              />
              <PasswordRequirements value={passwordValue} />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword" isRequired>
                Confirmar Senha
              </Label>
              <PasswordInput
                hookForm={registerForm}
                name="confirmPassword"
                placeholder="Confirme a senha"
                error={registerForm.formState.errors.confirmPassword?.message}
              />
            </InputGroup>

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
