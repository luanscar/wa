
import { db } from "@/lib/db";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const members = await db.profile.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        NOT: {
          email: session.user.email,
          companies: {
            some: {
             members: true 
            }
          }
        },

        
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;