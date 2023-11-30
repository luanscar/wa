import CompanyManager from "@/components/company/CompanyManager";
import { TabPanel } from "@/components/tabs/TabPanel";

const InboxLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { companyId: string };
}) => {
  return (
    <>
      <div className="flex w-full h-full">
        <CompanyManager companyId={params.companyId}>
          <TabPanel />
        </CompanyManager>


        {children}
      </div>
    </>
  );
};

export default InboxLayout;
