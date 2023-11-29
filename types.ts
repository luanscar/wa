import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import {  Member, Profile, Company } from "@prisma/client"

export type CompanyWithMembersWithProfiles = Company & {
  members: (Member & { profile: Profile })[];
};



export type MembersWithProfiles = (Member & { profile: Profile })[]


export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};