"use client";

import { useParams, usePathname } from "next/navigation";
import { Label } from "../ui/label";


export const SidebarHeader = () => {


  return (
    <div className="flex justify-between items-center border-b-2 border-b-[#F7F7F9] px-4 py-4">
     

        <Label
          className="
      text-sm 
      text-zinc-600 "
        >
          sideBar
        </Label>
     

       
     
    </div>
  );
};
