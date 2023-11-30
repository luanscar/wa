import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

import { db } from '@/lib/db'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { InitialModal } from '@/components/modals/InitialModal'
import { ResetPassword } from '@/components/modals/ResetPassword'

const SetupPage = async () => {
  const profile = await getCurrentUser()
  const member = await db.member.findFirst({
    where: {
      profileId: profile?.id,
    },
  })

  if (!profile) {
    return redirect('/')
  }

  const company = await db.company.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  const isDefaltPassword = await bcrypt.compare(
    '123456',
    profile.hashedPassword as string
  )

  if (isDefaltPassword) {
    return <ResetPassword profileId={profile.id} />
  }

  if (company) {
    return redirect(`/${company?.id}/inbox`)
  }

  return <InitialModal />
}

export default SetupPage
