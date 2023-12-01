'use client'

import { MembersWithProfiles } from '@/types'
import ProfileBox from './ProfileBox'

interface ProfileListProps {
  items: MembersWithProfiles
}

const ProfileList: React.FC<ProfileListProps> = ({ items }) => {
  console.log(items, 'PROFILE LIST')
  return (
    <div className="p-2">
      {items?.map((item) => <ProfileBox key={item.id} data={item} />)}
    </div>
  )
}

export default ProfileList
