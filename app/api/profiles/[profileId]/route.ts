
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";



export async function DELETE(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const profile = await getCurrentUser();

    console.log(params.profileId, 'ROUTE PROFILEID')
    if (!profile) {
      return new NextResponse("Unauthorized" ,{ status: 401 });
    }

    

    if (!params.profileId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const updateProfile = await db.profile.delete({
      where: {
        id: params.profileId
      }
    });

    return NextResponse.json(updateProfile);
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } }
) {

   
  try {
    const profile = await getCurrentUser();
    const { password } = await req.json();
    console.log(params.profileId, 'PROFILE ID')


    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.profileId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updateProfilePassword = await db.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
        hashedPassword: hashedPassword
      },
    });

    return NextResponse.json(updateProfilePassword);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}