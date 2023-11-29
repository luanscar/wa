import { TabPanel } from "@/components/tabs/TabPanel";
import CompanyManager from "@/components/company/CompanyManager";

const InboxLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { companyId: string };
}) => {
  return (
    <>
      <div className="flex w-full h-full">
        <CompanyManager  companyId={params.companyId}> 
        <TabPanel />
        </CompanyManager>
        

        {children}
      </div>
    </>
  );
};

export default InboxLayout;
