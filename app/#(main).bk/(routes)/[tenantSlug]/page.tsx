
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { InboxSidebar } from "./inbox/components/InboxSidebar";


interface TenantIdPageProps {
  params: {
    tenantSlug: string;
  }
};

const TenantIdPage = async ({
  params
}: TenantIdPageProps) => {

 
}

export default TenantIdPage;