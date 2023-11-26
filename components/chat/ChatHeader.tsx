import { Hash } from "lucide-react";
import { UserAvatar } from "../UserAvatar";



interface ChatHeaderProps {
  tenantId: string;
  name: string;
  type: "channel" | "conversation";
  image?: string;
}

export const ChatHeader = ({
  tenantId,
  name,
  type,
  image
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar 
          src={image}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && (
        //   <ChatVideoButton />
        "chatvideo buton"
        )}
      </div>
    </div>
  )
}