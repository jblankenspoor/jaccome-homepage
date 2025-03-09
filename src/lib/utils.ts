/**
 * Utility functions for Jacco's Portfolio
 * @description Contains utility functions for className merging and type variants
 * @version 3.0.0
 * @author Jacco
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Merges class names with Tailwind CSS classes
 * @param inputs - Class values to be merged
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
