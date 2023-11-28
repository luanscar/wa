

import getCurrentUser from '@/app/actions/getCurrentUser';
import NavigationSidebar from './NavigationSidebar';

async function Navigation() {

  const currentUser = await getCurrentUser();


  return (
    <div className="hidden md:block h-full p-2 border-r-2">
      <NavigationSidebar currentUser={currentUser} />
      
    </div>
  )
}

export default Navigation;