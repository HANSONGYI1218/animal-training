import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/utils";

const badgeVariants = cva(
  "h-7 inline-flex items-center rounded-full border px-4 py-0.5 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#9ECEA1] text-black hover:bg-currentColor border-transparent opacity-70",
        secondary:
          "bg-[#E28C9A] text-white hover:bg-currentColor border-transparent opacity-80",
        destructive:
          "bg-[#e4605e] text-white hover:bg-currentColor border-transparent",
        outline: "text-foreground",
        tag: "bg-slate-100 text-foreground hover:scale-105 border-transparent",
        done: "bg-neutral-400 text-foreground border-transparent opacity-60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
