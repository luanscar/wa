import { db } from "@/lib/db";
import getCurrentUser from "../actions/getCurrentUser";
import Navigation from "@/components/navigation/Navigation";
import { redirect } from "next/navigation";

const CompanyLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    companyId: string;
  };
}) => {
  const profile = await getCurrentUser();

  if (!profile) {
    return redirect("/");
  }

  const company = await db.company.findUnique({
    where: {
      id: params.companyId
    }
  
  });

  if(!company){
    return redirect('/')
  }


  
  return (
    <>
      <div className="flex h-full">
        <Navigation />

        {children}
      </div>
    </>
  );
};

export default CompanyLayout;
