"use client";

import { LuCat } from "react-icons/lu";
import { LuInbox } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Channel, ChannelType, Member, MemberRole, Profile, Tenant } from "@prisma/client";
import { InboxChannel } from "./InboxChannel";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface InboxMenuProps {
    tenant: {
        channels: Channel[]
        members: { Member & profile: Profile
        
        }
    }
  }

export const InboxMenu = async ({ channels, tenant, members }: InboxMenuProps) => {
    const profile = await getCurrentUser();

    const textChannels = tenant?.channels.filter(
        (channel) => channel.type === ChannelType.TEXT
      );

      const role = tenant.members.find(
        (member) => member.profileId === profile.id
      )?.role;

  return (
    <div className="p-1">
      <Tabs defaultValue="account" className="">
        <TabsList className="w-full flex justify-around ">
          <TabsTrigger className="" value="account">Unread</TabsTrigger>
          <TabsTrigger value="password">Read</TabsTrigger>
          <TabsTrigger value="arquivo">Arquive</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="arquive">Change your password here.</TabsContent>
        {textChannels.map((channel) => (
                  <InboxChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    tenant={tenant}
                  />
                ))}
        <TabsContent value="channels">
            {}

        </TabsContent>
      </Tabs>
    </div>
  );
};
