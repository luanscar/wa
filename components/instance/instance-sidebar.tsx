import { currentProfile } from "@/lib/currentProfile";
import { InstanceHeader } from "./instance-header"
import { db } from "@/lib/db";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";


export const InstanceSidebar = async () => {

  const user = await currentProfile();


  // const usersOnTenants = await db.usersOnTenants.findMany({
  //   where: {
  //     //@ts-ignore
  //     userId: user.id
  //   },

  //   include: {
  //     tenant: {
  //       include: {
  //         instances: {
  //           select: {
  //             instance: true
  //           }
  //         }
  //       },

  //     },
  //   },

  // });

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


  console.log(usersOnTenants[0])

  // border color 
  return (
    <div className="flex flex-col h-full text-primary w-full  bg-white border-r-2 border-r-[#F7F7F9]">
      <InstanceHeader />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          {instances.map(({ instance }) => (
            <div>{instance.instanceName}</div>
          ))}
          <Separator />
        </div>
      </ScrollArea>
    </div>
  )
}