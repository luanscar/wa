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
  const audioChannels = tenant?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = tenant?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = tenant?.members.filter(
    (member) => member.profileId === profile.id
  );

  if (!tenant) {
    return redirect("/");
  }

  const role = tenant.members.find(
    (member) => member.profileId === profile.id
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

        <div className="p-1">
        {!!textChannels?.length && (
          <Tabs defaultValue="account" className="">
            <TabsList className="w-full flex justify-around ">
              <TabsTrigger className="" value="account">
                Unread
              </TabsTrigger>
              <TabsTrigger value="password">Read</TabsTrigger>
              <TabsTrigger value="arquivo">Arquive</TabsTrigger>
              <TabsTrigger value={textChannels[0].name}>Channels</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="arquive">
              Change your password here.
            </TabsContent>
                
                <div className="mb-2">
                  <div className="space-y-[2px]">
                    {textChannels.map((channel) => (
                      <TabsContent value={channel.name}>
                      <InboxChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        tenant={tenant}
                      />
                       </TabsContent>
                    ))}
                  </div>
                </div>
               
          </Tabs>
          )}
        </div>

        {/* <ScrollArea className="flex-1 px-3">
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
                  label: "Voice Channels",
                  type: "channel",
                  data: audioChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  })),
                },
                {
                  tenantId,
                  label: "Video Channels",
                  type: "channel",
                  data: videoChannels?.map((channel) => ({
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
              <InboxSection
                sectionType="channels"
                channelType={ChannelType.TEXT}
                role={role}
                label="Text Channels"
              />
              <div className="space-y-[2px]">
                {textChannels.map((channel) => (
                  <InboxChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    tenant={tenant}
                  />
                ))}

                {!!members?.length && (
                  <div className="mb-2">
                    <InboxSection
                      sectionType="members"
                      role={role}
                      label="Members"
                      tenant={tenant}
                    />
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
              </div>
            </div>
          )}
        </ScrollArea> */}
      </div>
    </aside>
  );
};
