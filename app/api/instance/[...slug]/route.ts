import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
  const { data: { qrcode }, event } = await req.json();
  
  if(event === 'connection.update'){
      return new NextResponse("connection.update", { status: 200 });
    }


  const instanceExists = await db.instance.findUnique(
    {
      where: {
        instanceName: qrcode.instance
      }
    });

  if(!instanceExists?.instanceName){
    const newInstance = await db.instance.create({
      data: {
        qrcode: qrcode.base64,
        instanceName: qrcode.instance,
        status: 'created'
      }
    });
  
    return NextResponse.json(newInstance);
  }
  
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 302 });
  }
 
}
