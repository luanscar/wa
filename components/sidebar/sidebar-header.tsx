"use client";

import { useParams, usePathname } from "next/navigation";
import { Label } from "../ui/label";


export const SidebarHeader = () => {
  const params = useParams();
  const parts = usePathname();
  
  const firstPart = parts.split("/");

  // Obtenha o segundo segmento (índice 1) e capitalize a primeira letra
  const formattedString = parts[1].charAt(0).toUpperCase();

  console.log(formattedString);

  return (
    <div className="flex justify-between items-center w-full border-b-2 border-b-[#F7F7F9] px-4 py-4">
     

        <Label
          className="
      text-sm 
      text-zinc-600 "
        >
          {formattedString}
        </Label>
     

       
     
    </div>
  );
};
