import { Sidebar } from './Sidebar'
import { SidebarToggle } from './SidebarToggle'
import { MainContent } from './MainContent'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Sidebar />
      <SidebarToggle />
      <MainContent>{children}</MainContent>
    </div>
  )
}
