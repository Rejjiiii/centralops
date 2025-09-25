// src/components/ui/button.jsx
import React from "react";
import { cn } from "@/lib/utils"; // same helper as in card.jsx

export function Button({ className, variant = "default", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-[#192338] text-white hover:bg-[#31487A] focus:ring-blue-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
