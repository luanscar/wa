'use client';

import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";
import { useState } from "react";
// import Avatar from "../Avatar";
import { User } from "@prisma/client";
import useRoutes from "@/hooks/useRoutes";

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ currentUser, }, 'TEST')

  return (
    <>

      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
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
    </>
  );
}

export default DesktopSidebar;