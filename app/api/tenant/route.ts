import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const slug = name.trim().replaceAll(" ", "-").toLowerCase();
    
    const tenant = await db.tenant.create({
      data: {
        profileId: profile.id,
        name,
        slug: slug,
        channels: {
          create: [
            {
              name: "general", profileId: profile.id
            }
          ]
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN
            }
          ]
        }
     
      }
    });

    return NextResponse.json(tenant);
  } catch (error) {
    console.log("[TENANTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
