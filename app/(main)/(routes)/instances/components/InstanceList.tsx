'use client';


import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { Instance, Tenant, UsersOnTenants } from "@prisma/client";
import InstanceBox from "./InstanceBox";


interface InstanceListProps {
  items: {
    instance: {
      id: string;
      instanceName: string | null;
      status: string | null;
      qrcode: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  }[]
}

const InstanceList: React.FC<InstanceListProps> = ({
  items,
}) => {
  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
        
      "
    >
      <div>
        <div className="flex-col">
          <SidebarHeader />
        </div>
        {items.map((item) => (
          <InstanceBox
            key={item.instance.id}
            data={item.instance}
          />
        ))}
      </div>
    </aside>
  );
}

export default InstanceList;