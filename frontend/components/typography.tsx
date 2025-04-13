import { cn } from "./cn";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-black text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-black text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-black text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-black text-xl font-semibold tracking-tight",
      p: "leading-7 font-medium ",
      span: "font-medium ",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = variant || "p";

    return (
      <Comp
        className={cn(` `, typographyVariants({ variant, className }))}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
