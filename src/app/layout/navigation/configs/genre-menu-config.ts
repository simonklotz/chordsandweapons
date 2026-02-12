import { NavMenu } from '../nav-menu.interface';

export const genreMenuConfig: NavMenu = {
  label: 'Genre',
  navItems: [
    {
      label: 'Techno',
      route: '/genre/techno',
    },
    {
      label: 'House',
      route: '/genre/house',
    },
    {
      label: 'Trance',
      route: '/genre/trance',
    },
    {
      label: 'Electro',
      route: '/genre/electro',
    },
    {
      label: 'Breaks',
      route: '/genre/breaks',
    },
  ],
};
