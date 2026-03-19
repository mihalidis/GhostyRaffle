"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  primary:
    "bg-[#FF007F] text-[#F8F8FF] border-[#CC0066] shadow-[4px_4px_0_#7B0040] hover:shadow-[2px_2px_0_#7B0040] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
  secondary:
    "bg-[#7B00FF] text-[#F8F8FF] border-[#5500BB] shadow-[4px_4px_0_#2D0080] hover:shadow-[2px_2px_0_#2D0080] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
  danger:
    "bg-[#FF3366] text-[#F8F8FF] border-[#CC1144] shadow-[4px_4px_0_#7B0022] hover:shadow-[2px_2px_0_#7B0022] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
  ghost:
    "bg-transparent text-[#00E5FF] border-[#00E5FF] shadow-[4px_4px_0_#007B8A] hover:shadow-[2px_2px_0_#007B8A] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
};

const sizeStyles = {
  sm: "px-3 py-2 text-[8px] border-2",
  md: "px-5 py-3 text-[10px] border-[3px]",
  lg: "px-8 py-4 text-[12px] border-4",
};

export default function PixelButton({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={clsx(
        "font-['Press_Start_2P'] uppercase tracking-wider cursor-pointer",
        "transition-all duration-75 select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
