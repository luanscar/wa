import { currentProfile } from "@/lib/currentProfile"


const Panel = async () => {
  const user = await currentProfile();

  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}

export default Panel;