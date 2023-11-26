
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getOrCreateConversation } from "@/app/actions/conversation";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";

interface MemberIdPageProps {
  params: {
    memberId: string;
    tenantId: string;
  },
  searchParams: {
    video?: boolean;
  }
}

const MemberIdPage = async ({
  params,
  searchParams,
}: MemberIdPageProps) => {
  const profile = await getCurrentUser();

  if (!profile) {
    return redirect('/');
  }

  const currentMember = await db.member.findFirst({
    where: {
      tenantId: params.tenantId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if (!conversation) {
    return redirect(`/${params.tenantId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return ( 
    <div className="hidden lg:block lg:pl-[398px] h-full">
      <ChatHeader
        image={otherMember.profile.image as string ||  '/images/placeholder.jpg'}
        name={otherMember.profile.name as string}
        tenantId={params.tenantId}
        type="conversation"
      />
     
      {!searchParams.video && (
        <>
          {/* <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          /> */}
          <ChatInput
            name={otherMember.profile.name as string}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
   );
}
 
export default MemberIdPage;