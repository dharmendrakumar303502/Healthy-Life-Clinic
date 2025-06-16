
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Search, CalendarDays, BellRing, Sparkles, Settings, Info, ListChecks, Mail } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Symptom Analyzer',
    href: '/symptom-analyzer',
    icon: Search,
  },
  {
    label: 'Appointments',
    href: '/appointments',
    icon: CalendarDays,
  },
  {
    label: 'Reminders',
    href: '/reminders',
    icon: BellRing,
  },
  {
    label: 'Health Tips',
    href: '/health-tips',
    icon: Sparkles,
  },
  {
    label: 'About Us',
    href: '/about',
    icon: Info,
  },
  {
    label: 'Services',
    href: '/services',
    icon: ListChecks,
  },
  {
    label: 'Contact Us',
    href: '/contact',
    icon: Mail,
  },
];

export const settingsNavItem: NavItem = {
  label: 'Settings',
  href: '/settings',
  icon: Settings,
};
