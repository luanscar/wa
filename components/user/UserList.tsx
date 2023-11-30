'use client';


import { MembersWithProfiles } from "@/types";
import UserBox from "./UserBox";


interface ProfileListProps {
  items: MembersWithProfiles;
}

const UserList: React.FC<ProfileListProps> = ({
  items,
}) => {
  console.log(items, 'TEST')


  return (
    <div className="p-2">
      {items.map((item) => (
        <UserBox
          key={item.id}
          data={item.profile}
        />
      ))}
    </div>
  );
}

export default UserList;