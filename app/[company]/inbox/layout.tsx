import { db } from "@/lib/db";
import getCurrentUser from "../../actions/getCurrentUser";
import { TabPanel } from "@/components/tabs/TabPanel";
import SidebarManager from "@/components/sidebar-manager/SidebarManager";
import { Label } from "@/components/ui/label";





const InboxLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getCurrentUser();
  

  const companyId = await db.profile.findUnique({
    where: {
      id: profile?.id,
    },
    select: {
      companies: {
        select: {
          slug: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex w-full h-full">
        <SidebarManager label="Inbox">
          <TabPanel />
        </SidebarManager>
        
        {children}
      </div>
    </>
  );
};

export default InboxLayout;
