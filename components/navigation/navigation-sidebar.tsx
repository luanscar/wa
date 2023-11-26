"use client";

import Link from "next/link";
import { NavigationAction } from "./navigation-action"
import { LuCat } from "react-icons/lu";
import { LuInbox } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuSmartphone } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

const NAVIGATION_ITEMS = [
  {
    title: "Panel",
    icon: LuCat,
  },
  {
    title: "Inbox",
    icon: LuInbox,
  },
  {
    title: "Contacts",
    icon: LuUsers,
  },
  {
    title: "Instances",
    icon: LuSmartphone,
  },
  {
    title: "Settings",
    icon: LuSettings,
  },

];

export const NavigationSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const newPathname = pathname.split("/")
  
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full border-r-2 border-r-[#F7F7F9] bg-white py-3">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
        {NAVIGATION_ITEMS.map((item) => (
          <Link className={cn("hover:bg-[#108559]/10 text-2xl transition duration-200 flex items-center justify-start w-fit  rounded-md py-2 px-2",
            newPathname[1] === item.title.toLocaleLowerCase() && "bg-[#108559]/10")}
            href={
              item.title.toLocaleLowerCase() === "panel"
                ? "/panel"
                : item.title.toLocaleLowerCase() === "profile"
                  ? "#"
                  : `/${item.title.toLowerCase()}`
            }
            key={item.title}
          >
            <div>
              <item.icon stroke="#0C8457" />
            </div>
            {item.title !== "Inbox" && <div></div>}
          </Link>
        ))}
      </div>
      <NavigationAction />
    </div>
  )
}