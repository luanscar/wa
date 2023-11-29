import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { id } from "date-fns/locale";

export async function POST(
  req: Request
) {
  try {
    const profile = await getCurrentUser();
    const { name, email } = await req.json();
    const { searchParams } = new URL(req.url);

    const companyId = searchParams.get("companyId");

    console.log(companyId, 'POST PROFILES')

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!companyId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const isUserExists = await db.profile.findUnique({
        where: {
          email: email
        }
      });

      if(isUserExists) {
        return NextResponse.json({ error: `Já existe um perfil com esse e-mail cadastrado!` }, { status: 400 })
      }

    const hashedPassword = await bcrypt.hash("123456", 12);

    const newProfile = await db.profile.create({
        data: {
            email,
            name,
            profileToken: uuidv4(),
            hashedPassword,
            members: {
                create: {
                    companyId: companyId,
                    role: MemberRole.MODERATOR,
                }
            }
        }
    })


    

    return NextResponse.json(newProfile);
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}