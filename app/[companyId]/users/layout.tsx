import getCurrentUser from '@/app/actions/getCurrentUser'
import CompanyManager from '@/components/company/CompanyManager'
import UserList from '@/components/user/UserList'
import { db } from '@/lib/db'

import React from 'react'

export default async function UsersLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    companyId: string
  }
}) {
  const profile = await getCurrentUser()
  const members = await db.member.findMany({
    where: {
      company: {
        id: params.companyId,
      },
      NOT: {
        profile: {
          email: profile?.email,
        },
      },
    },

    include: {
      profile: true,
    },
  })

  return (
    <div className="flex w-full h-full">
      <CompanyManager companyId={params.companyId}>
        <UserList items={members} />
      </CompanyManager>

      {children}
    </div>
  )
}
