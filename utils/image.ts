const normalizeImageValue = (value?: string | null) => {
  if (!value) return "";

  const trimmed = value.trim();
  if (!trimmed) return "";

  const hasDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
  const hasSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");

  if (hasDoubleQuotes || hasSingleQuotes) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

export const toImageSource = (value?: string | null) => {
  if (!value) return "";
  const normalizedValue = normalizeImageValue(value);
  if (!normalizedValue) return "";

  if (
    /^data:image\//i.test(normalizedValue) ||
    /^https?:\/\//i.test(normalizedValue)
  ) {
    return normalizedValue;
  }

  return `data:image/*;base64,${normalizedValue}`;
};
