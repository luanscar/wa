import getCurrentUser from "@/app/actions/getCurrentUser";
import getUsers from "@/app/actions/getUsers";
import SidebarManager from "@/components/sidebar-manager/SidebarManager";
import UserList from "@/components/user/UserList";
import { db } from "@/lib/db";
import React from "react";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const profile = await getCurrentUser()
    const members = await db.member.findMany({
        where: {
            company: {
               slug: "bfcont",
              }, 
              
              
              NOT: {
                profile: {
                    email: "luanscar@outlook.com"
                }
            },
            
           
        },
        include: {
            profile: true,
          }
    })
  return (
  <div className="flex w-full h-full">
    <SidebarManager label="Users">
        <UserList items={members}/>
    </SidebarManager>
    {children}
  </div>)
}
