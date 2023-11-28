'use client';


import { Profile } from "@prisma/client";
import UserBox from "./UserBox";


interface ProfileListProps {
  items: Profile[];
}

const UserList: React.FC<ProfileListProps> = ({ 
  items, 
}) => {
  return ( 
    <div className="p-2">
      {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
    </div>
  );
}
 
export default UserList;