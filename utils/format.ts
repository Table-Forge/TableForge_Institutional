export const normalizeString = (str: string, removeSpaces?: boolean) => {
  if (!str) return "";

  const result = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return removeSpaces ? result.replace(/\s+/g, "") : result;
};
