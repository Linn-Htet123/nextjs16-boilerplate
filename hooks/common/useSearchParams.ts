"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export const useURLSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const getURLSearchParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };
  const setURLSearchParams = (
    params: Record<string, string | number | boolean | undefined>,
    path?: string
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    });
    const newPath = `${path ?? pathname}?${newSearchParams.toString()}`;
    router.replace(newPath);
  };
  return {
    getURLSearchParams,
    setURLSearchParams,
  };
};
