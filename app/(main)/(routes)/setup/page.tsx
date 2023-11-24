import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {

  const profile = await getCurrentUser();

  const tenant = await db.tenant.findFirst({
    where: {
      userId: profile?.id
    }
  });

  if (tenant) {
    return redirect(`/tenant/${tenant.id}`);
  }

  return <InitialModal />
}

export default SetupPage;