/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchSuggestions } from "./SearchSuggestion";
import { useGetSuggestion } from "@/hooks/api/useGetSuggestion";
import { X } from "lucide-react";
import RedditBotIcon from "../icon/RedditBotIcon";
import { Separator } from "../ui/separator";
import AskIcon from "../icon/AskIcon";
import { useURLSearchParams } from "@/hooks/common/useSearchParams";
import { useRouter, useParams } from "next/navigation";

type Suggestion = {
  id: string;
  text: string;
  type: "subreddit" | "post" | "query";
  url: string;
};

export default function Search({ placeholder = "Find Anything" }) {
  const router = useRouter();
  const params = useParams();
  const { setURLSearchParams } = useURLSearchParams();

  const [query, setQuery] = useState("");
  const [selectedSubreddit, setSelectedSubreddit] = useState<string>("");

  useEffect(() => {
    setSelectedSubreddit((params.subreddit as string) ?? "");
  }, [params.subreddit]);

  const [debouncedQuery] = useDebounce(query, 300);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillWidth, setPillWidth] = useState(45); // Default padding

  const { data, isPending } = useGetSuggestion(isFocused ? debouncedQuery : "");

  useLayoutEffect(() => {
    if (selectedSubreddit && pillRef.current) {
      setPillWidth(pillRef.current.offsetWidth + 48);
    } else {
      setPillWidth(48);
    }
  }, [selectedSubreddit]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && query === "" && selectedSubreddit) {
      clearInput();
    }
  };

  const clearInput = () => {
    setQuery("");
    setSelectedSubreddit("");
    setSelectedIndex(-1);
    router.push("/search");
  };

  const handleSelect = (item: Suggestion) => {
    if (item.type === "subreddit") {
      const targetUrl = item.url || `/r/${item.text}`;
      router.push(targetUrl);
      setQuery("");
      setIsFocused(true);
      return;
    }

    const searchParams: Record<string, string> = {
      q: item.text,
    };

    setURLSearchParams(searchParams, "/search");
    setIsFocused(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <RedditBotIcon />
      </div>

      {/* Subreddit Pill */}
      {selectedSubreddit && (
        <div
          ref={pillRef}
          className="absolute left-11 top-1/2 -translate-y-1/2 z-20 flex items-center bg-muted px-2 py-1 rounded-full border text-xs font-medium"
        >
          r/{selectedSubreddit}
          <button onClick={clearInput} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <Input
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        placeholder={
          selectedSubreddit ? `Search in r/${selectedSubreddit}` : placeholder
        }
        style={{ paddingLeft: `${pillWidth}px` }}
        className="w-full h-10 pr-24 rounded-full text-sm border border-input hover:border-primary focus-visible:border-primary focus-visible:ring-0 transition-all"
      />

      {/* Right side buttons */}
      <div className="flex items-center absolute right-2 top-1/2 -translate-y-1/2 gap-1">
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={clearInput}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Separator orientation="vertical" className="h-5" />
        <Button variant="ghost" size="sm" className="gap-2">
          <AskIcon />
          <span>Ask</span>
        </Button>
      </div>

      {!isPending && isFocused && (
        <SearchSuggestions
          searchQuery={debouncedQuery}
          suggestions={data || []}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          className="absolute z-50 mt-2 w-full border bg-background rounded-xl shadow-lg overflow-hidden"
        />
      )}
    </div>
  );
}
