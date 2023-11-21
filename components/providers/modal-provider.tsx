"use client";

import { CreateInstanceModal } from "@/components/modals/create-instance-modal";
import { useEffect, useState } from "react";
import { QueryProvider } from "./query-provider";


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
      <CreateInstanceModal />

    </>
  )
}