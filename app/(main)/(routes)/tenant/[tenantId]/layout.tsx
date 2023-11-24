import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

const TenantIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantId: string };
}) => {
  const profile = await getCurrentUser();

  if (!profile) {
    return redirect('/')
  }

  const tenant = await db.tenant.findUnique({
    where: {

    }
  });

  if (!server) {
    return redirect("/");
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