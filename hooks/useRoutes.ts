import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { LuCat } from "react-icons/lu";
import { LuInbox } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuSmartphone } from "react-icons/lu";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    { 
      label: 'Panel', 
      href: '/panel', 
      icon: LuCat,
      active: pathname === '/panel' 
    },
    { 
      label: 'Inbox', 
      href: '/conversations', 
      icon: LuInbox,
      active: pathname === '/conversations' || !!conversationId
    },
    { 
      label: 'Contacts', 
      href: '/contacts', 
      icon: LuUsers,
      active: pathname === '/conatcts'
    },
    { 
      label: 'Instances', 
      href: '/instances', 
      icon: LuSmartphone,
      active: pathname === '/instances'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;