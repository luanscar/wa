"use client";

import { cn } from "@/lib/utils";
import { Company } from "@prisma/client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LuInbox, LuSettings, LuSmartphone, LuUsers } from "react-icons/lu";

const NAVIGATION_ITEMS = [

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

  interface NavigationProps {
    params: {
        company: string
    }
  }

export const Navigation = () => {
    const params = useParams()
    const pathname = usePathname()?.split(`/`);
    console.log(pathname)
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full border-r-2 border-r-[#F7F7F9] bg-white py-3">
    <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
      {NAVIGATION_ITEMS.map((item) => (
        <Link className={cn("hover:bg-[#108559]/10 text-2xl transition duration-200 flex items-center justify-start w-fit  rounded-md py-2 px-2",
        pathname[1] === item.title.toLocaleLowerCase() && "bg-[#108559]/10")}
          href={
            item.title.toLocaleLowerCase() === "inbox"
              ? `${params?.company}/inbox`
              : item.title.toLocaleLowerCase() === "contacts"
                ? `${params?.company}/contacts`
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
  </div>
  )
}