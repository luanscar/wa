import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { MemberRole } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const slug = name.trim().replaceAll(" ", "-").toLowerCase();
    
    const company = await db.company.create({
      data: {
        profileId: profile.id,
        name,
        slug: slug,
        channels: {
          create: [
            {
              name: name, profileId: profile.id
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

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
