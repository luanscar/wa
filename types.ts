import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Tenant, Member, Profile } from "@prisma/client"

export type TenantWithMembersWithProfiles = Tenant & {
  members: (Member & { profile: Profile })[];
};
