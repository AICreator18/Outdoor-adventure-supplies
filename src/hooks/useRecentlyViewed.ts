import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const MAX_RECENT = 8;

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useLocalStorage<string[]>("oas-recently-viewed", []);

  const trackView = useCallback(
    (productId: string) => {
      setRecentIds((current) => {
        const withoutCurrent = current.filter((id) => id !== productId);
        return [productId, ...withoutCurrent].slice(0, MAX_RECENT);
      });
    },
    [setRecentIds],
  );

  return { recentIds, trackView };
}
