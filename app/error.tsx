"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-destructive/50 bg-card p-6 shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>

          <h2 className="mb-2 text-center text-2xl font-semibold">
            Something went wrong
          </h2>

          <p className="mb-6 text-center text-sm text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mb-6 rounded-md bg-muted p-4">
              <p className="mb-2 text-xs font-semibold">Error:</p>
              <pre className="overflow-x-auto text-xs text-muted-foreground">
                {error.message}
              </pre>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>
            <a
              href="/"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
            >
              <Home className="h-4 w-4" />
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
