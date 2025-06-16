
"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavItem, navItems, settingsNavItem } from '@/components/navigation/nav-items';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';


type AppLayoutProps = {
  children: ReactNode;
};

function AppLayoutInternal({ children, pathname }: AppLayoutProps & { pathname: string }) {
  const { isMobile, state: sidebarState } = useSidebar();

  return (
    <>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-r"
      >
        <SidebarHeader className="p-4 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {/* Replace with your actual logo if you have one */}
            <Image src="/logo.png" alt="Healthy Life Clinic Logo" width={28} height={28} className="h-7 w-7" />
            <h1 className="font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden">
              Healthy Life Clinic
            </h1>
          </div>
          <SidebarTrigger className="md:hidden" />
        </SidebarHeader>
        <ScrollArea className="flex-grow">
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item: NavItem) => {
                const menuItemContent = (
                  <SidebarMenuButton asChild isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                );

                const tooltipShouldBeVisible = sidebarState === "collapsed" && !isMobile;

                return (
                  <SidebarMenuItem key={item.href}>
                    {tooltipShouldBeVisible ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {menuItemContent}
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      menuItemContent
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        <SidebarFooter className="p-2">
           {(() => {
             const settingsLinkContent = (
               <SidebarMenuButton asChild isActive={pathname === settingsNavItem.href}>
                  <Link href={settingsNavItem.href}>
                    <settingsNavItem.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden font-medium">{settingsNavItem.label}</span>
                  </Link>
                </SidebarMenuButton>
             );

             const settingsTooltipShouldBeVisible = sidebarState === "collapsed" && !isMobile;

             return settingsTooltipShouldBeVisible ? (
               <Tooltip>
                 <TooltipTrigger asChild>
                   {settingsLinkContent}
                 </TooltipTrigger>
                 <TooltipContent side="right" align="center">
                   {settingsNavItem.label}
                 </TooltipContent>
               </Tooltip>
             ) : (
               settingsLinkContent
             );
           })()}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <div className="p-2 md:p-0 flex items-center justify-start md:hidden sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b mb-4">
          <SidebarTrigger />
           <div className="flex items-center gap-2 ml-2">
            <Image src="/logo.png" alt="Healthy Life Clinic Logo" width={24} height={24} className="h-6 w-6" />
            <h1 className="font-headline text-lg font-semibold">
              Healthy Life Clinic
            </h1>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-var(--header-height,0px))]">
          <main className="container mx-auto px-4 py-8 md:py-10">
            {children}
          </main>
        </ScrollArea>
      </SidebarInset>
    </>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // SidebarProvider must wrap any component that uses useSidebar()
  return (
    <SidebarProvider defaultOpen>
      <AppLayoutInternal pathname={pathname}>
        {children}
      </AppLayoutInternal>
    </SidebarProvider>
  );
}
