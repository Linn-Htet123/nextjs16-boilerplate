"use client";

import { Search, Users } from "lucide-react";

export interface SuggestionItem {
  id: string;
  text: string;
  type: "subreddit" | "post";
  url: string;
}

export interface SuggestionResponse {
  subreddits: SuggestionItem[];
  posts: SuggestionItem[];
}

interface SearchSuggestionsProps {
  searchQuery?: string;
  suggestions: SuggestionResponse;
  selectedIndex: number;
  onSelect: (value: {
    id: string;
    text: string;
    type: "subreddit" | "post" | "query";
    url: string;
  }) => void;
  className?: string;
}

export function SearchSuggestions({
  searchQuery,
  suggestions,
  selectedIndex,
  onSelect,
  className,
}: SearchSuggestionsProps) {
  const hasSubreddits = suggestions.subreddits?.length > 0;
  const hasPosts = suggestions.posts?.length > 0;

  let globalIndex = 0;

  return (
    <ul
      id="suggestions-list"
      className={`mt-1 bg-background border rounded-md shadow-lg absolute z-50 max-w-2xl w-full 
                    max-h-[400px] overflow-y-auto scrollbar-hide py-2 ${className}`}
      role="listbox"
    >
      {!hasPosts && !hasSubreddits && (
        <li
          className={`flex items-center px-4 py-2 cursor-pointer transition-colors 
            bg-accent text-accent-foreground hover:bg-muted/50
          `}
          onClick={() =>
            onSelect({
              id: "",
              text: searchQuery || "",
              type: "query",
              url: "",
            })
          }
          role="option"
          aria-selected={true}
        >
          <div className="mr-3 flex h-8 w-8 items-center justify-center text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <span className="text-sm">{searchQuery}</span>
        </li>
      )}
      {hasPosts && (
        <>
          {suggestions.posts.map((item) => {
            const isSelected = globalIndex === selectedIndex;

            return (
              <li
                key={`post-${item.id}`}
                className={`flex items-center px-4 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted/50"
                }`}
                onClick={() =>
                  onSelect({
                    id: item.id,
                    text: item.text,
                    type: "post",
                    url: item.url,
                  })
                }
                role="option"
                aria-selected={isSelected}
              >
                <div className="mr-3 flex h-8 w-8 items-center justify-center text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
                <span className="text-sm">{item.text}</span>
              </li>
            );
          })}
        </>
      )}
      {hasSubreddits && (
        <>
          <li className="px-4 py-2 text-xs font-semibold text-muted-foreground">
            Communities
          </li>
          {suggestions.subreddits.map((item) => {
            const isSelected = globalIndex === selectedIndex;

            return (
              <li
                key={`sub-${item.id}`}
                className={`flex items-center px-4 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted/50"
                }`}
                onClick={() =>
                  onSelect({
                    id: item.id,
                    text: item.text,
                    type: "subreddit",
                    url: item.url,
                  })
                }
                role="option"
                aria-selected={isSelected}
              >
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.text}</span>
                  <span className="text-xs text-muted-foreground">
                    Community
                  </span>
                </div>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}
