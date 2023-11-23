
import { db } from "@/lib/db";
import InstanceList from "./components/InstanceList";
import { currentProfile } from "@/lib/currentProfile";


export default async function InstancesLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const user = await currentProfile();


  const usersOnTenants = await db.usersOnTenants.findMany({
    where: {
      //@ts-ignore
      userId: user.id
    },

    include: {
      tenant: {
        include: {
          instances: {
            select: {
              instance: true
            }
          }
        }
      }
    },

  });

  const instances = usersOnTenants[0].tenant.instances

  return (
    <div className="h-full">

      <InstanceList

        items={instances} />
      {children}
    </div>

  );
}