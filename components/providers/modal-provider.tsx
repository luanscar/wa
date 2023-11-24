"use client";

import { useEffect, useState } from "react";
import { CreateTenantModel } from "../modals/create-tenant-modal";


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

    </>
  )
}