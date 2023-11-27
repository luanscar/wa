import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Tenant, Member, Profile } from "@prisma/client"

export type TenantWithMembersWithProfiles = Tenant & {
  members: (Member & { profile: Profile })[];
};


export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};