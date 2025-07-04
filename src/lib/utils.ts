import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {  // cool util function to combine and merge CSS class names, handling conflicts
  return twMerge(clsx(inputs))                 // e.g. cn("px-2 py-1", "px-3") returns "py-1 px-3" with px-3 overriding px-2
}