// src/components/ui/card.jsx
import React from "react";
import { cn } from "@/lib/utils"; // If you don’t have a cn utility, I’ll show a fallback below

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white text-gray-900 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-4", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-4 pt-0", className)} {...props} />
  );
}
