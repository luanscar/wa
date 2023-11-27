import EmptyState from "@/components/EmptyState";

interface CompanyPageProps {
  params: {
    company: string;
  }
};

const CompanyPage = async ({
  params
}: CompanyPageProps) => {



 return(
  <div className="hidden lg:block lg:pl-80 w-full h-full">
  <EmptyState />
  </div>
 )
}

export default CompanyPage;