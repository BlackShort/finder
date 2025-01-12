import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const key = '500eff18-30a1-4887-aab6-adf1ff9dbbe5';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
