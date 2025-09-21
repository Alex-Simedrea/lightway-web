import { AppSidebar } from '@/components/ui/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}