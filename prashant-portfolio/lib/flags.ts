export function isGpt5CodexPreviewEnabled(): boolean {
  const v = process.env.NEXT_PUBLIC_GPT5_CODEX_PREVIEW_ENABLED;
  if (v === undefined) return true; // enabled for all clients by default
  return v === "true" || v === "1" || v?.toLowerCase() === "yes";
}

export const GPT5_CODEX_LABEL = "GPT-5 Codex (Preview) Enabled";
