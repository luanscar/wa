
import { db } from "@/lib/db";
import InstanceList from "./components/InstanceList";
import { currentProfile } from "@/lib/currentProfile";
import getUsers from "@/app/actions/getUsers";


export default async function InstancesLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const user = await currentProfile();

  const users = await getUsers();

  console.log(users)

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


  return (
    <div className="h-full">

      <InstanceList

        items={users} />
      {children}
    </div>

  );
}