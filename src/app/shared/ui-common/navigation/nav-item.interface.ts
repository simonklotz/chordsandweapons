export interface NavItem {
  navRoute: string[];
  navText: string;
  navItems?: NavItem[];
  id?: string;
}
