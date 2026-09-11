"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProfileSchema,
  type IUpdateProfileForm,
  type IAuthUser,
} from "@/schemas/auth.schema";
import { AuthService } from "@/services/auth.service";
import { useBoundStore } from "@/store";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/input-group/input-group";
import { Label } from "@/components/label/label";
import { ControlledInput } from "@/components/input/input.default.controlled";
import { DateInput } from "@/components/input/input.date.controlled";
import { ControlledSelect } from "@/components/input/input.select.controlled";
import { KnightHeadIcon } from "@/components/ui/icons";
import { toImageSource } from "@/utils/image";
import { useUserGenderEnum } from "@/features/users/hooks/enums/use-user-gender-enum";
import { Camera, Check, Loader2 } from "lucide-react";

const GENDER_OPTIONS = [
  { value: "Male", label: "Masculino" },
  { value: "Female", label: "Feminino" },
  { value: "NonBinary", label: "Não Binário" },
  { value: "PreferNotToSay", label: "Prefiro não responder" },
  { value: "Other", label: "Outro" },
];

interface IEditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IAuthUser;
}

export function EditProfileModal({
  isOpen,
  onClose,
  user,
}: IEditProfileModalProps) {
  const setAuthUser = useBoundStore((state) => state.setAuthUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { genderEnum } = useUserGenderEnum({
    enabled: isOpen,
    filterAllowed: true,
  });

  const genderOptions = React.useMemo(() => {
    if (genderEnum.length === 0) return GENDER_OPTIONS;
    return genderEnum.map((opt) => ({
      value: String(opt.value),
      label: opt.name || String(opt.value),
    }));
  }, [genderEnum]);

  const initialBirthDate = user.birthDate
    ? typeof user.birthDate === "string"
      ? user.birthDate.split("T")[0]
      : user.birthDate instanceof Date
        ? user.birthDate.toISOString().split("T")[0]
        : ""
    : "";

  const form = useForm<IUpdateProfileForm>({
    resolver: zodResolver(UpdateProfileSchema) as Resolver<IUpdateProfileForm>,
    defaultValues: {
      nickname: user.nickname || "",
      birthDate: initialBirthDate,
      gender: (user.gender as string) || "PreferNotToSay",
    },
  });

  const avatarSource = toImageSource(user.avatarUrl);

  const handleAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("A imagem deve ter no máximo 2 MB.");
      return;
    }

    try {
      setIsUploadingAvatar(true);
      setErrorMessage(null);
      const updated = await AuthService.updateAvatar(user.id, file);
      setAuthUser(updated);
      setFeedbackMessage("Foto de perfil atualizada com sucesso!");
    } catch {
      setErrorMessage("Erro ao atualizar foto de perfil.");
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onSubmit = async (data: IUpdateProfileForm) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setFeedbackMessage(null);

      const updated = await AuthService.updateProfile({
        id: user.id,
        username: user.username,
        email: user.email,
        nickname: data.nickname,
        birthDate: data.birthDate,
        gender: data.gender,
      });

      setAuthUser(updated);
      onClose();
    } catch {
      setErrorMessage("Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setErrorMessage(null);
        setFeedbackMessage(null);
        onClose();
      }}
      title="Editar Perfil de Aventureiro"
      maxWidth="md"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-[#ff2400]/50 bg-[#ff2400]/15 overflow-hidden shadow-xl">
              {avatarSource ? (
                <Image
                  src={avatarSource}
                  alt={user.nickname || user.username}
                  fill
                  sizes="96px"
                  unoptimized
                  className="rounded-full object-cover"
                />
              ) : (
                <KnightHeadIcon className="w-12 h-12 text-[#ff2400]" />
              )}
              {isUploadingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                  <Loader2 className="w-6 h-6 animate-spin text-[#ff2400]" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="cursor-pointer absolute bottom-0 right-0 p-2 rounded-full bg-[#ff2400] text-white hover:bg-[#e02000] shadow-lg transition-colors disabled:opacity-50"
              title="Trocar foto de perfil"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFileChange}
            />
          </div>
          <p className="text-[11px] text-[#A1A1A1]">
            Formatos aceitos: JPG, PNG, WEBP (máx. 2 MB)
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-400 text-xs text-center">
            {errorMessage}
          </div>
        )}

        {feedbackMessage && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs text-center flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup>
              <Label htmlFor="username">
                Nome de Usuário (@handle)
              </Label>
              <input
                id="username"
                value={user.username}
                disabled
                className="flex h-11 w-full rounded-lg border border-[#3a3a3a] bg-white/5 px-3.5 py-2 text-sm font-medium text-[#faf3e0]/60 cursor-not-allowed opacity-70 outline-none"
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">
                E-mail
              </Label>
              <input
                id="email"
                value={user.email}
                disabled
                className="flex h-11 w-full rounded-lg border border-[#3a3a3a] bg-white/5 px-3.5 py-2 text-sm font-medium text-[#faf3e0]/60 cursor-not-allowed opacity-70 outline-none"
              />
            </InputGroup>
          </div>

          <InputGroup>
            <Label htmlFor="nickname" isRequired>
              Apelido na Forja
            </Label>
            <ControlledInput
              hookForm={form}
              name="nickname"
              placeholder="Como quer ser chamado"
              error={form.formState.errors.nickname?.message}
            />
          </InputGroup>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup>
              <Label htmlFor="birthDate" isRequired>
                Data de Nascimento
              </Label>
              <DateInput
                hookForm={form}
                name="birthDate"
                placeholder="DD/MM/AAAA"
                error={form.formState.errors.birthDate?.message}
                showYearDropdown
                maxDate={new Date()}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="gender" isRequired>
                Identidade de Gênero
              </Label>
              <ControlledSelect
                hookForm={form}
                name="gender"
                options={genderOptions}
                error={form.formState.errors.gender?.message}
              />
            </InputGroup>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2D2D2D]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <span>Salvar Alterações</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
