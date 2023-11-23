

import getCurrentUser from '@/app/actions/getCurrentUser';
import DesktopSidebar from './DesktopSidebar';

async function Sidebar({ children }: {
  children: React.ReactNode,
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full border-r-2">
      <DesktopSidebar currentUser={currentUser!} />
      {/* <MobileFooter /> */}
      <main className="h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar;