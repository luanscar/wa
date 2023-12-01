import { Member, MemberRole, Profile } from '@prisma/client'
import axios from 'axios'
import { Pen, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Avatar from '../Avatar'
import LoadingModal from '../modals/LoadingModal'
import { Button } from '../ui/button'
import qs from 'query-string'
import { useModal } from '@/hooks/use-modal-store'

interface ProfileBoxProps {
  data: Member & { profile: Profile }
  role?: MemberRole
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ data }, role) => {
  const router = useRouter()

  const [loadingId, setLoadingId] = useState('')

  const { onOpen } = useModal()

  const onDelete = async (profileId: string) => {
    try {
      setLoadingId(profileId)
      const url = qs.stringifyUrl({
        url: `/api/profiles/${profileId}`,
      })

      await axios.delete(url)
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId('')
    }
  }

  return (
    <>
      {loadingId && <LoadingModal />}
      <div className="flex flex-row group relative">
        <div
          onClick={() => {}}
          className="
          z-99999
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
          
          hover:bg-gradient-to-l from-gray-100
        "
        >
          <Avatar user={data} />
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <div className="flex flex-col justify-between items-start mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {data.profile.name}
                </p>
                <p className="text-sm text-gray-600">{data.profile.email}</p>
              </div>
            </div>
          </div>
        </div>
        {data.role !== MemberRole.ADMIN && (
          <div>
            <Button
              onClick={() => onOpen('editProfile', data)}
              className="absolute bg-white hover:bg-gray-100 drop-shadow-lg shrink-0 h-10 w-10 top-4 p-0 top-4 mr-14 rounded-full right-0 hidden group-hover:flex"
            >
              <Pen size={16} stroke="black" />
            </Button>
            <Button
              onClick={() => onDelete(data.profileId)}
              className="absolute bg-white hover:bg-gray-100 drop-shadow-lg shrink-0 h-10 w-10 top-4 p-0 mr-2 rounded-full right-0 hidden group-hover:flex"
            >
              <Trash2 size={16} stroke="red" />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileBox
