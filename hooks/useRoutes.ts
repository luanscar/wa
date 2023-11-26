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
      href:`/${params.tenantSlug}/inbox`, 
      icon: LuInbox,
      active: pathname ===`/${params.tenantSlug}/inbox` || !!conversationId
    },
    { 
      label: 'Panel', 
      href: `/${params.tenantSlug}/panel`, 
      icon: LuCat,
      active: pathname === `/${params.tenantSlug}/panel` 
    },
    
    { 
      label: 'Users', 
      href: `/${params.tenantSlug}/users`, 
      icon: LuUsers,
      active: pathname === `/${params.tenantSlug}/contacts`
    },
    { 
      label: 'Instances', 
      href: `/${params.tenantSlug}/instances`, 
      icon: LuSmartphone,
      active:  pathname === `/${params.tenantSlug}/instances`
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