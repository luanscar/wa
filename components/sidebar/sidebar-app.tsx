import { db } from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarHeader } from "./sidebar-header";
import { currentProfile } from "@/lib/currentProfile";
import { SidebarInstance } from "./sidebar-instance";
import { useParams } from "next/navigation";

export const SidebarApp = async () => {

  const profile = await currentProfile();



  const usersOnTenants = await db.usersOnTenants.findMany({
    where: {
      //@ts-ignore
      userId: profile.id
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


  console.log(instances)


  return (
    <div className="flex flex-col h-full text-primary w-full  bg-white">
      <SidebarHeader />

      <ScrollArea>
        <div className="space-y-[2px]">
          {instances.map(({ instance }) => (
            <SidebarInstance
              key={instance.id}
              instanceName={instance.instanceName}
              instanceId={instance.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}