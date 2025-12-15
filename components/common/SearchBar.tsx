"use client";

import { useState, useRef, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchSuggestions } from "./SearchSuggestion";
import { useGetSuggestion } from "@/hooks/useGetSuggestion";
import { X } from "lucide-react";
import RedditBotIcon from "../icon/RedditBotIcon";
import { Separator } from "../ui/separator";
import AskIcon from "../icon/AskIcon";

type Suggestion = {
  id: string;
  text: string;
  type: "subreddit" | "post" | "query";
  url: string;
};

export default function Search({ placeholder = "Find Anything" }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"subreddit" | "post" | "query" | "">("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isPending } = useGetSuggestion(isFocused ? debouncedQuery : "");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const clearInput = () => {
    setType("");
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleSelect = (item: Suggestion) => {
    setType(item.type === "query" ? "" : item.type);
    if (item.type === "subreddit") {
      setQuery(item.url);
    } else {
      setQuery(item.text);
    }
    setIsFocused(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <RedditBotIcon />
      </div>

      {type === "subreddit" && (
        <Button
          size={"sm"}
          variant={"outline"}
          className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pl-4 ml-1"
        >
          {query}
        </Button>
      )}
      <Input
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className={`
  w-full h-10 ${type === "subreddit" ? "pl-32" : "pl-12"} pr-20
  rounded-full text-sm
  border border-input
  hover:border-primary
  focus-visible:border-primary
  focus-visible:ring-0
  focus-visible:ring-offset-0
  focus:outline-none
  transition-colors
`}
      />

      <div className="flex items-center absolute right-2 top-1/2 -translate-y-1/2 gap-1">
        {query && (
          <Button variant="ghost" size="icon" onClick={clearInput}>
            <X className="h-4 w-4" />
          </Button>
        )}

        <div className="h-5">
          <Separator orientation="vertical" />
        </div>

        <Button variant="ghost">
          <AskIcon />
          Ask
        </Button>
      </div>

      {!isPending && isFocused && data && (
        <SearchSuggestions
          searchQuery={debouncedQuery}
          suggestions={data}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          className="absolute z-10 mt-1 w-full border bg-background rounded-md shadow-sm"
        />
      )}
    </div>
  );
}
