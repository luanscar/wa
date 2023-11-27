
import { InboxSidebar } from "./components/InboxSidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";


export default async function InboxLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const profile = await getCurrentUser();

  const tenant  = await db.profile.findUnique({
    where: {
      id: profile?.id
    },
    select: {
      tenants: true
    }
  });
  
  const tenantId = tenant?.tenants[0].id

  console.log(tenantId)

  return (
    <div className="h-full">
         <InboxSidebar tenantId={tenantId as string} />
      {children}
    </div>

  );
}