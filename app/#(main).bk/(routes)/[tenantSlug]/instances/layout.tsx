
import { db } from "@/lib/db";
import InstanceList from "./components/InstanceList";
import { currentProfile } from "@/lib/currentProfile";
import getUsers from "@/app/actions/getUsers";


export default async function InstancesLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const users = await getUsers();




  return (
    <div className="h-full">
      <InstanceList
        items={users} />
      {children}
    </div>

  );
}