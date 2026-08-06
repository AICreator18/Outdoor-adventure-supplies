export interface NavLinkItem {
  label: string;
  path: string;
  icon?: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLinkItem[];
}

export interface NavItem {
  label: string;
  path: string;
  megaMenu?: MegaMenuColumn[];
  badge?: string;
  highlight?: boolean;
}
