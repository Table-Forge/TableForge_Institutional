"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { toImageSource } from "@/utils/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KnightHeadIcon } from "@/components/ui/icons";
import { useUserTypeEnum } from "@/features/users/hooks/enums/use-user-type-enum";
import { useUserStatusEnum } from "@/features/users/hooks/enums/use-user-status-enum";
import { useUserGenderEnum } from "@/features/users/hooks/enums/use-user-gender-enum";
import { UserStatus } from "@/components/user-status/user-status";
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Sparkles,
  ArrowLeft,
  MessagesSquare,
  Smartphone,
  Hash,
  Pencil,
} from "lucide-react";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";

export default function PerfilPage() {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [failedAvatarUrl, setFailedAvatarUrl] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const avatarSource = toImageSource(user?.avatarUrl);
  const hasValidAvatar = Boolean(avatarSource && failedAvatarUrl !== avatarSource);
  const displayName = user?.nickname || user?.username || "Aventureiro";
  const handleName = user?.username
    ? `@${user.username}`
    : `@${displayName.toLowerCase().replace(/\s+/g, "")}`;

  const { typeEnum } = useUserTypeEnum(Boolean(user));
  const { statusEnum } = useUserStatusEnum(Boolean(user));
  const { genderEnum } = useUserGenderEnum({
    enabled: Boolean(user),
    filterAllowed: false,
  });

  const userTypeLabel =
    typeEnum.find(
      (item) => String(item.value).toLowerCase() === String(user?.type ?? "").toLowerCase(),
    )?.name ||
    user?.type ||
    "Jogador";

  const userGenderLabel =
    genderEnum.find(
      (item) => String(item.value).toLowerCase() === String(user?.gender ?? "").toLowerCase(),
    )?.name ||
    user?.gender ||
    "Não informado";

  const formatDate = (dateValue?: string | Date | null) => {
    if (!dateValue) return "Não informada";
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return String(dateValue);
      return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return String(dateValue);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-xl bg-[#ff2400]/10 border border-[#ff2400]/30 flex items-center justify-center text-[#ff2400] mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#faf3e0]">
            Acesso ao Perfil
          </h1>
          <p className="text-sm text-[#A1A1A1]">
            Você precisa estar autenticado na Forja para visualizar e gerenciar os dados do seu perfil.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            onClick={() => openAuthModal("login")}
            className="w-full sm:w-auto"
          >
            Entrar na Forja
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1A1] hover:text-[#faf3e0] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao início</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Pencil className="w-3.5 h-3.5 text-[#ff2400]" />
            <span>Editar Perfil</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-500/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair da conta</span>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-[#2D2D2D] bg-[#141414] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff2400]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-[#ff2400]/40 bg-[#ff2400]/15 text-2xl font-black text-[#faf3e0] shadow-inner">
            <div className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center">
              {hasValidAvatar ? (
                <Image
                  src={avatarSource}
                  alt={displayName}
                  fill
                  unoptimized
                  onError={() => setFailedAvatarUrl(avatarSource)}
                  className="rounded-full object-cover"
                />
              ) : (
                <KnightHeadIcon className="w-14 h-14 text-[#ff2400]" />
              )}
            </div>
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#141414] z-10" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#faf3e0] tracking-tight">
                {displayName}
              </h1>
              <Badge variant="primary" className="text-[10px] py-0.5">
                <Sparkles className="w-3 h-3 fill-[#ff2400]" />
                <span>{user.badge || "Ferreiro Fundador"}</span>
              </Badge>
            </div>

            <p className="text-sm font-medium text-[#ff2400]">
              {handleName}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-[#A1A1A1]">
              <UserStatus value={user.status} options={statusEnum} />
              <span>•</span>
              <span>ID #{user.id}</span>
              {user.type && (
                <>
                  <span>•</span>
                  <span>{userTypeLabel}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#2D2D2D] bg-[#141414] p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-[#2D2D2D] pb-3">
            <User className="w-4 h-4 text-[#ff2400]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#faf3e0]">
              Identificação & Acesso
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" /> ID da Conta
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5 font-mono">
                #{user.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Nome de Usuário
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5">
                {user.username}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Apelido na Forja
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5">
                {user.nickname || "Não informado"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> E-mail Cadastrado
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5 break-all">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#2D2D2D] bg-[#141414] p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-[#2D2D2D] pb-3">
            <Shield className="w-4 h-4 text-[#ff2400]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#faf3e0]">
              Detalhes da Forja
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Data de Nascimento
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5">
                {formatDate(user.birthDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Membro da Forja desde
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5">
                {formatDate(user.createdAt || new Date())}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Tipo de Aventureiro
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5">
                {userTypeLabel}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Identidade de Gênero
              </p>
              <p className="text-sm font-semibold text-[#faf3e0] mt-0.5">
                {userGenderLabel}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#A1A1A1] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Reconhecimento
              </p>
              <p className="text-sm font-semibold text-[#ff2400] mt-0.5">
                {user.badge || "Ferreiro Fundador"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#2D2D2D] bg-[#141414] p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#faf3e0]">
          Ações Rápidas
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/taverna">
            <Button variant="outline" size="sm">
              <MessagesSquare className="w-4 h-4 text-[#ff2400]" />
              Acessar A Taverna
            </Button>
          </Link>
          <Link href="/#baixar-app">
            <Button variant="secondary" size="sm">
              <Smartphone className="w-4 h-4" />
              Baixar o Aplicativo
            </Button>
          </Link>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
}
