import getCurrentUser from '@/app/actions/getCurrentUser'
import CompanyManager from '@/components/company/CompanyManager'
import ProfileList from '@/components/profiles/ProfileList'
import { db } from '@/lib/db'

import React from 'react'

export default async function ProfilesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    companyId: string
  }
}) {
  const profile = await getCurrentUser()

  // const members = await db.member.findMany({
  //   where: {
  //     company: {
  //       id: params.companyId,
  //     },
  //     NOT: {
  //       profile: {
  //         email: profile?.email,
  //       },
  //     },
  //   },

  //   include: {
  //     profile: true,
  //   },
  // })

  const company = await db.company.findUnique({
    where: {
      id: params.companyId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          profile: {
            createdAt: 'desc',
          },
        },
      },
    },
  })

  const members = company?.members.filter(
    (member) => member.profileId !== profile?.id
  )

  console.log(members, 'USERS LAYOUT')

  return (
    <div className="flex w-full h-full">
      <CompanyManager companyId={params.companyId}>
        <ProfileList items={members} />
      </CompanyManager>

      {children}
    </div>
  )
}
