import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center px-4 py-2 h-fit justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-transparent text-base font-semibold hover:bg-currentColor text-black hover:text-green-100',
        destructive:
          'bg-black text-base font-semibold hover:bg-black/90 text-white',
        outline:
          'border border-input text-base font-semibold bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-white text-black font-semibold text-base rounded-full',
        login:
          'bg-white text-base font-semibold ease-in-out text-black border-2 border-green-100 hover:scale-105 duration-300 transition',
        lectureCategory:
          'bg-white text-sm font-medium border-b-2 border-white hover:bg-currentColor text-black hover:border-gray-300 rounded-none py-4',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
