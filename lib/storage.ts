export const VALUES_STORAGE_KEY = "blueprint_values";
export const SITUATION_STORAGE_KEY = "blueprint_situation";

export function clearBlueprintState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(VALUES_STORAGE_KEY);
  window.localStorage.removeItem(SITUATION_STORAGE_KEY);
}
