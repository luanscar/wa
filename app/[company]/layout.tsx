import { db } from "@/lib/db";
import getCurrentUser from "../actions/getCurrentUser";
import Navigation from "@/components/navigation/Navigation";
import SidebarManager from "@/components/sidebar-manager/SidebarManager";
import { TabPanel } from "@/components/tabs/TabPanel";
import { redirect } from "next/navigation";

const CompanyLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getCurrentUser();

  if(!profile){
    return redirect('/')
  }

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
      <div className="flex h-full">
        <Navigation />
        

        {children}
      </div>
    </>
  );
};

export default CompanyLayout;
