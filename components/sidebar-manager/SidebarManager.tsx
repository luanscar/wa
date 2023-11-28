"use client"

import React, { SetStateAction, useState } from "react";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";

const SidebarManager = ({ children, label }: {children: React.ReactNode; label: string;}) => {

    

     

  return (
    <div className="hidden md:flex flex-col w-[600px] border-r-2 h-full">
      <div className="p-3 border-b-2  flex">
        <Label className="leading-6">{label}</Label>
      </div>

        {children}
      
    </div>
  );
};

export default SidebarManager;
