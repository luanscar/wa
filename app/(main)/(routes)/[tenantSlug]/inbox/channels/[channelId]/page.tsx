
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";

interface ChannelIdPageProps {
  params: {
    tenantId: string;
    channelId: string;
  }
}

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await getCurrentUser();

  if (!profile) {
    return redirect('/')
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      tenantId: params.tenantId,
      profileId: profile.id,
    }
  });

  if (!channel || !member) {
    redirect("/");
  }

  return ( 
    <div className="hidden lg:block lg:pl-[398px] h-full">
      <EmptyState />
    </div>
   );
}
 
export default ChannelIdPage;