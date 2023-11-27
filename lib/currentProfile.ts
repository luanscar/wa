import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { db } from "./db"
/**
 * Store user preferences
 * @file /api/preferences.ts
 * @param req
 * @param res
 */
const currentProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    const user = await db.profile.findUnique({
      where: {
        //@ts-ignore
        id: session?.user.id
      }
    })

    const data = user?.id

    console.log('aaaaa', user)
    
    return data;
}

export default currentProfile
