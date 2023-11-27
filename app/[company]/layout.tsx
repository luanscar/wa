
import { db } from "@/lib/db";
import getUsers from "../actions/getUsers";
import { Navigation } from "@/components/navigation/Navigation";
import { profile } from "console";
import getCurrentUser from "../actions/getCurrentUser";

const CompanyLayout = async ({ children }: { children: React.ReactNode }) => {
  
    const users = await getUsers();
    const profile = await getCurrentUser();

  const companyId = await db.profile.findUnique({
    where: {
      id: profile?.id,
      
    },
    select: {
      companies: {
        select: {
          slug: true
        }
      }
    }
  
  })
  console.log(companyId?.companies[0].slug)
  
    return (
      <> 
      <div className="flex h-full">
        <Navigation />

        <div className="md:ml-[72px] w-96 h-full">
        Sidebar
        </div>
        
        {children}
      </div>
      
      </>
      
  );
};

export default CompanyLayout;
