import { searchServices } from "@/services/search";
import { useQuery } from "@tanstack/react-query";

export const useGetSuggestion = (query: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: async () => searchServices.fetchSearchSuggestions(query),
    enabled: query.trim().length > 0,
  });

  return { data, isPending };
};
