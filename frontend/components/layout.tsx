import { cn } from "@/lib";

export default function Layout({ children, className, ...props }: React.PropsWithChildren<React.JSX.IntrinsicElements['section']>) {
  return (
    // implement no scrollbar
    <section {...props} className={
      cn(
        'w-full h-full px-4 overflow-y-auto no-scrollbar',
        className
      )
    } >
      {children}
    </section>
  )
}