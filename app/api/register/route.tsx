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


  const isUserExists = await db.profile.findUnique({
    where: {
      email: body.email
    }
  });

  if (isUserExists) {
    return NextResponse.json({ error: "E-mail já existente." }, { status: 400 })
  }



  const newUser = await db.profile.create({
    data: {
      email,
      name,
      profileToken: uuidv4(),
      hashedPassword
    }
  });

  return NextResponse.json(newUser);


}