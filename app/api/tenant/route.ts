import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const slug = name.trim().replaceAll(" ", "-").toLowerCase();
    const server = await db.tenant.create({
      data: {
        userId: profile.id,
        name,
        slug: slug
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
