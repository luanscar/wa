import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;


  const hashedPassword = await bcrypt.hash(password, 12);


  const isUserExists = await db.user.findUnique({
    where: {
      email: body.email
    }
  });

  if (isUserExists) {
    return NextResponse.json({ error: "E-mail já existente." }, { status: 400 })
  }



  const newUser = await db.user.create({
    data: {
      email,
      name,
      userToken: uuidv4(),
      hashedPassword
    }
  });

  const newTenant = await db.tenant.create({
    data: {
      name: 'Meu Tenant',
      slug: 'Slug Tenant',
      plan: 'Free',
      users: {
        create: [
          {
            userId: 'clp5yx4a00000e1z3jiouc8h3',
            assignedBy: 'Luan',
          }

        ]
      }
    }
  });


  console.log(newTenant)


  return NextResponse.json(newUser);


}