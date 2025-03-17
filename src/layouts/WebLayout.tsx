
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { WebSidebar } from '@/components/WebSidebar';
import { cn } from '@/lib/utils';

interface WebLayoutProps {
  children: ReactNode;
  className?: string;
}

export function WebLayout({ children, className }: WebLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <WebSidebar />
        <SidebarInset className={cn(className)}>
          <div className="px-6 py-6 flex items-center border-b">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-bold">SalãoZap</h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
