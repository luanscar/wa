import { NavigationAction } from "./navigation-action"

export const NavigationSideBar = async () => {
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">

      <NavigationAction />
    </div>
  )
}