"use client";

import { useModal } from "@/hooks/use-modal-store"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import api from "@/services/api";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QRCodeArea } from "../qrcode-area";

const apiKey = 'B6D711FCDE4D4FD5936544120E713976';

const onCreateInstance = async () => {
  const response = await api.post('/instance/create', {
    "instanceName": "abc",
    "token": process.env.API_TOKEN,
    "qrcode": true,
    "number": "557999999999",
    "webhook": "http://localhost:3000/api/instance/create",
    "webhook_by_events": false,
    "events": [
      "APPLICATION_STARTUP",
      "QRCODE_UPDATED",
      // "MESSAGES_SET",
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "MESSAGES_DELETE",
      "SEND_MESSAGE",
      // "CONTACTS_SET",
      // "CONTACTS_UPSERT",
      // "CONTACTS_UPDATE",
      // "PRESENCE_UPDATE",
      // "CHATS_SET",
      // "CHATS_UPSERT",
      // "CHATS_UPDATE",
      // "CHATS_DELETE",
      // "GROUPS_UPSERT",
      // "GROUP_UPDATE",
      // "GROUP_PARTICIPANTS_UPDATE",
      "CONNECTION_UPDATE",
      "CALL"
      // "NEW_JWT_TOKEN",
      // "TYPEBOT_START",
      // "TYPEBOT_CHANGE_STATUS",
    ]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.NEXT_PUBLIC_KEY,
    }
  });
  return response.data
}


export const CreateInstanceModal = () => {

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createInstance";



  const handleClose = () => {
    onClose();
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/* <span>
          <pre>{JSON.stringify(data, null, 2)}</pre>

        </span> */}
        <QRCodeArea
          base64={'/images/qrcode.png'}
          loading={false}
        />
        <Button onClick={() => onCreateInstance()}>
          Criar Instancia
        </Button>
      </DialogContent>
    </Dialog>

  )
}