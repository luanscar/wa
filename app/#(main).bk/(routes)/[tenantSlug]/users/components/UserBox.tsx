import axios from "axios";
import { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {  Profile } from "@prisma/client";
import LoadingModal from "@/components/modals/LoadingModal";
import Avatar from "@/components/Avatar";


interface UserBoxProps {
  data: Profile
}

const UserBox: React.FC<UserBoxProps> = ({ 
  data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.id })
    .then((data) => {
      router.push(`/${params.tenantSlug}/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default UserBox;