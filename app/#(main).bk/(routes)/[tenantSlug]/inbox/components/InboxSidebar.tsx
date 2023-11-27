import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { InboxSearch } from "./InboxSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { InboxSection } from "./InboxSection";
import { InboxChannel } from "./InboxChannel";
import { InboxMember } from "./InboxMember";
import { Label } from "@/components/ui/label";
import { InboxMenu } from "./InboxMenu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { title } from "process";

interface InboxSidebarProps {
  tenantId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

export const InboxSidebar = async ({ tenantId }: InboxSidebarProps) => {
  const profile = await getCurrentUser();

  if (!profile) {
    return redirect("/");
  }

  const tenant = await db.tenant.findUnique({
    where: {
      id: tenantId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = tenant?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const members = tenant?.members.filter(
    (member) => member.profileId !== profile.id
  );

  console.log(tenant);

  if (!tenant) {
    return redirect("/");
  }

  const role = tenant.members.find(
    (member) => member.profileId !== profile.id
  )?.role;

  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
        
      "
    >
      <div className="flex-col">
        <Label className="flex justify-between items-center w-full border-b-2 border-b-[#F7F7F9] px-4 py-4">
          Inbox
        </Label>

        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <InboxSearch
              data={[
                {
                  tenantId,
                  label: "Text Channels",
                  type: "channel",
                  data: textChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },

                {
                  tenantId,
                  label: "Members",
                  type: "member",
                  data: members?.map((member) => ({
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role],
                  })),
                },
              ]}
            />
          </div>

          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
          {!!textChannels?.length && (
            <div className="mb-2">
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="channels">Channels</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>
                <TabsContent value="channels">
                  {textChannels.map((channel) => (
                    <InboxChannel
                      key={channel.id}
                      channel={channel}
                      role={role}
                      tenant={tenant}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="members">
                  {!!members?.length && (
                    <div className="mb-2">
                      <div className="space-y-[2px]">
                        {members.map((member) => (
                          <InboxMember
                            key={member.id}
                            member={member}
                            tenant={tenant}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="space-y-[2px]"></div>
            </div>
          )}
        </ScrollArea>
      </div>
    </aside>
  );
};
