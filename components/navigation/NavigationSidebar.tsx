'use client';

import { useState } from "react";
import Avatar from "../Avatar";
import useRoutes from "@/hooks/useRoutes";
import { Profile } from "@prisma/client";
import NavigationItem from "./NavigationItem";

interface NavigationSidebarProps {
  currentUser: Profile
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);


  return ( 
    <>
      
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <NavigationItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div 
            onClick={() => setIsOpen(true)} 
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      
    </>
   );
}
 
export default NavigationSidebar;