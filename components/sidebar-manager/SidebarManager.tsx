import React, { SetStateAction, useState } from "react";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { CompanyHeader } from "../company/CompanyHeader";
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

interface CompanySidebarProps {
  companyId: string;
}

const SidebarManager = async ({
  companyId
}: CompanySidebarProps) => {

    
  const profile = await getCurrentUser();

  if (!profile) {
    return redirect("/");
  }

  const company = await db.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      members: {
        include: {
          profile: true
        }
      }
    }
  });

  if(!company) {
    return redirect('/')
  }

  const role = company.members.find((member) => member.profileId === profile.id)?.role;
     

  return (
    <div className="hidden md:flex flex-col w-[600px] border-r-2 h-full">
      <CompanyHeader 
      company={company}
      role={role}/>

    </div>
  );
};

export default SidebarManager;
