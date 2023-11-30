import EmptyState from "@/components/EmptyState";

interface CompanyPageProps {
  params: {
    company: string;
  }
};

const CompanyPage = async ({
}: CompanyPageProps) => {



  return (
    <div className="hidden lg:block w-full h-full">
      <EmptyState />
    </div>
  )
}

export default CompanyPage;