import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface TenantIdPageProps {
  params: {
    tenantId: string;
  }
};

const TenantIdPage = async ({
  params
}: TenantIdPageProps) => {
  const profile = await curregetntProfile();

  if (!profile) {
    return redirect('/')
  }

  const server = await db..findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default TenantIdPage;