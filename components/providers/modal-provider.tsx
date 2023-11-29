"use client";

import { useEffect, useState } from "react";
import { MembersModal } from "../modals/MembersModal";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <MembersModal/>
    </>
  )
}