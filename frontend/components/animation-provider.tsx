'use client';

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function AnimationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="w-full h-full bg-transparent" >
        {children}
      </div>
    </AnimatePresence>
  );
}