import React from 'react'
import { currentProfile } from "@/lib/currentProfile";

const InstanceIdLayout = async ({ children, params }: {
  children: React.ReactNode;
  params: { instanceId: string; }
}) => {

  const profile = await currentProfile();
  return (
    <div className="h-full">
      <div
        className="hidden md:flex h-full w-72 border-r-2 border-r-[#F7F7F9] z-20 flex-col fixed inset-y-0">
        LayoutIdPage
      </div>

      <main className="h-full md:pl-72">
        {children}
      </main>
    </div>

  )
}

export default InstanceIdLayout