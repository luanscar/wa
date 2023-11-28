import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { InitialModal } from "@/components/modals/InitialModal";

const SetupPage = async () => {


  const profile = await getCurrentUser();

  const company = await db.company.findFirst({
    where: {
      profileId: profile?.id
    }
  });

  if(!profile){
    return redirect('/')
  }

  if (company) {
    return redirect(`/${company.slug}/inbox`);
  }

  return <InitialModal />
}

export default SetupPage;