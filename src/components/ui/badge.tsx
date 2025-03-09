/**
 * Badge Component for Jacco's Portfolio
 * @description A small badge component for displaying tags and labels
 * @version 3.0.0
 * @author Jacco
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge variants configuration using class-variance-authority
 * @type {function} - Function that returns class names based on variants
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Badge component props interface
 * @interface BadgeProps
 * @extends {React.HTMLAttributes<HTMLDivElement>} - HTML div element attributes
 * @extends {VariantProps<typeof badgeVariants>} - Badge variant props
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component for displaying tags and labels
 * @param {BadgeProps} props - Component props
 * @returns {JSX.Element} - Badge component
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
