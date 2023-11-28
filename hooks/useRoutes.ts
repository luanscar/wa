import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
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
  const params = useParams();


  const routes = useMemo(() => [
    
    
    { 
      label: 'Inbox', 
      href:`/${params?.company}/inbox`, 
      icon: LuInbox,
      active: pathname ===`/${params?.company}/inbox` || !!conversationId
    },
    { 
      label: 'Panel', 
      href: `/${params?.company}/panel`, 
      icon: LuCat,
      active: pathname === `/${params?.company}/panel` 
    },
    
    { 
      label: 'Users', 
      href: `/${params?.company}/users`, 
      icon: LuUsers,
      active: pathname === `/${params?.company}/users`
    },
    { 
      label: 'Instances', 
      href: `/${params?.tenantSlug}/instances`, 
      icon: LuSmartphone,
      active:  pathname === `/${params?.company}/instances`
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