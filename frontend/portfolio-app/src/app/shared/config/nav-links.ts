export interface NavLink {
  readonly label: string;
  readonly key: string; // TranslateService key
  readonly path: string;
  readonly exact: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', key: 'nav.home', path: '/home', exact: true },
  { label: 'About', key: 'nav.about', path: '/about', exact: false },
  { label: 'Skills', key: 'nav.skills', path: '/skills', exact: false },
  { label: 'Projects', key: 'nav.projects', path: '/projects', exact: false },
  { label: 'Experience', key: 'nav.experience', path: '/experience', exact: false },
  { label: 'Blog', key: 'nav.blog', path: '/blog', exact: false },
  { label: 'Contact', key: 'nav.contact', path: '/contact', exact: false },
];