import { redirect, usePathname } from "next/navigation";

import getCurrentUser from "@/app/actions/getCurrentUser";
import Sidebar from "@/components/sidebar/Sidebar";
import { db } from "@/lib/db";
import { InboxSidebar } from "./inbox/components/InboxSidebar";




const TenantIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantSlug: string };
}) => {
  const profile = await getCurrentUser();

  const tenants = await db.tenant.findFirst({
    where: {
      slug: params.tenantSlug
    }
  });


  if (!profile || !!!tenants?.slug) {
    return redirect('/');
  }


  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-20 z-30 flex-col fixed inset-y-0">
        <Sidebar>
        
        </Sidebar>
      </div>
      <main className="h-full">
        {children}
      </main>
    </div>
  );
}

export default TenantIdLayout;