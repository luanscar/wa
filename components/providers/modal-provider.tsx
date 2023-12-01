'use client'

import { useEffect, useState } from 'react'
import { CreateProfileModal } from '../modals/CreateProfileModal'
import { EditProfileModal } from '../modals/EditProfileModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateProfileModal />
      <EditProfileModal />
    </>
  )
}
