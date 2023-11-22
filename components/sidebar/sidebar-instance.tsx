"use client";


import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

interface SidebarInstanceProps {
  instanceId: string;
  instanceName: string;
  status: string;
  qrcode: string;
}

export const SidebarInstance = ({ instanceName, status, qrcode }: SidebarInstanceProps) => {

  const params = useParams();

  console.log(params)
  const router = useRouter();
  const onClick = () => {
    router.push(`/instances/${instanceId}`)
  }
  return (
    <div className="flex flex-col h-full text-primary w-full  bg-white border-r-2 border-r-[#F7F7F9]">
      <button
        onClick={onClick}
        className={cn(
          "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",

        )}
      >
        {instanceName}
      </button>
    </div>
  )
}