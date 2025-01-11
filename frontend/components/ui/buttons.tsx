import { cn } from "@/lib"
import { HTMLMotionProps, motion } from "framer-motion"
import React, { PropsWithChildren } from "react"

type Variants = 'full' | 'outline' | 'icon' | 'ghost'

type ButtonProps = PropsWithChildren<HTMLMotionProps<'button'>> & {
  variant?: Variants
}

/**
 * @animated with motion.button
 */
export const Button: React.FC<ButtonProps> = ({ children, variant = 'full', className, ...props }) => {
  return (
    <motion.button
      type="button"
      {...props}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        ` font-semibold rounded-xl disabled:opacity-50 `,
        { 'bg-primary-500 text-white': variant === 'full' },
        { 'border-2 border-primary-500 text-primary-400 ': variant === 'outline' },
        { 'text-primary-500': variant === 'ghost' },
        { 'px-4 py-2': variant !== 'icon' },
        { 'bg-primary-500 text-white px-2 py-2': variant === 'icon' },
        className,
      )}
    >{children}</motion.button>
  )
}