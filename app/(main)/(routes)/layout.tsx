import React from 'react'
import { InstanceSidebar } from '@/components/instance/instance-sidebar';

function MainLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div
        className="hidden md:flex h-full w-72 z-20 flex-col fixed inset-y-0">
        <InstanceSidebar />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  )
}

export default MainLayout