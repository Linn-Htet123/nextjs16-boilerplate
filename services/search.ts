import { api } from "@/lib/axios";

export const searchServices = {
  fetchSearchSuggestions: async (query: string) => {
    const response = await api.get("/search/suggestions", {
      params: { q: query },
    });
    return response.data;
  },
};
