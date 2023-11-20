import { currentProfile } from "@/lib/currentProfile"


const InstancesPage = async () => {
  const user = await currentProfile();

  return (
    <div>
      instances  page<br />
      {JSON.stringify(user)}
    </div>
  )
}

export default InstancesPage;