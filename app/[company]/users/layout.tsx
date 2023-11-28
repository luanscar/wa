import getUsers from "@/app/actions/getUsers";
import SidebarManager from "@/components/sidebar-manager/SidebarManager";
import UserList from "@/components/user/UserList";
import React from "react";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const users = await getUsers();

  return (
  <div className="flex w-full h-full">
    <SidebarManager label="Users">
        <UserList items={users}/>
    </SidebarManager>
    {children}
  </div>)
}
