"use client"

import { usePathname } from "next/navigation";
import { Label } from "../ui/label"


export const SidebarHeader = () => {
  const pathname = usePathname().split("/");
  const capitalizedPathname = pathname[1].charAt(0).toUpperCase().concat(pathname[1].slice(1))


  return (
    <div className="flex w-full border-b-2 border-b-[#F7F7F9] px-4 py-4">
      <Label className="text-zinc-600">{capitalizedPathname}</Label>
    </div>
  )
}