import type { TSelectOptions } from "@/components/select/select.interfaces";
import { UserService } from "@/features/users/services/users.services";
import { mapToSelectOptions } from "@/utils/map-to-select-options";
import { useQuery } from "@tanstack/react-query";
import { USER_KEYS } from "../query-key";

const ENUM_GC_TIME = 1000 * 60 * 60 * 24;

interface IUseUserGenderEnumProps {
  enabled?: boolean;
  filterAllowed?: boolean;
}

export const useUserGenderEnum = ({
  enabled = true,
  filterAllowed = true,
}: IUseUserGenderEnumProps = {}) => {
  const genderEnumQuery = useQuery({
    queryKey: USER_KEYS.genderEnum(),
    queryFn: () => UserService.getGenderEnum(),
    select: (data) =>
      mapToSelectOptions({
        data,
        labelKey: "name",
        valueKey: "value",
        filterAllowed,
      }),
    enabled,
    staleTime: Infinity,
    gcTime: ENUM_GC_TIME,
    refetchOnWindowFocus: false,
  });

  return {
    genderEnum: (genderEnumQuery.data ?? []) as TSelectOptions[],
    isLoadingGenderEnum: genderEnumQuery.isPending,
    genderEnumQuery,
  };
};
