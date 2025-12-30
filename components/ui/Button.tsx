import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-brand-teal text-white hover:bg-brand-teal-dark hover:scale-105 shadow-lg hover:shadow-xl":
            variant === "primary",
          "bg-brand-gunmetal text-white hover:bg-brand-gunmetal-light hover:scale-105 shadow-lg":
            variant === "secondary",
          "border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white hover:scale-105":
            variant === "outline",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
