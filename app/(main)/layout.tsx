import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";

const MainLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSideBar />
        <Separator
          className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        />
      </div>
      <main className="md:pl-[72px] h-full">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;