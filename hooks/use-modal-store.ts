import { MembersWithProfiles } from "@/types";
import { ChannelType, Company, Member, Profile } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "members" | "profiles" | "editProfile" | "createChannel";

interface ModalData {
  company?: Company;
  members?: Member;
  profile?: Profile
  channelType?: ChannelType;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
