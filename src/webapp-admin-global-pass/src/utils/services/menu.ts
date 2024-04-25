export const menuList = [
  {
    id: 1,
    label: 'Página inicial',
    path: '/home',
    icon: {
      alt: 'ícone de casa',
      src: '/home-icon.svg',
      srcSelected: '/home-icon-selected.svg',
    },
  },
  {
    id: 2,
    label: 'Convites',
    path: '/convites',
    icon: {
      alt: 'ícone de uma carta',
      src: '/invite-user-icon.svg',
      srcSelected: '/invite-user-icon-selected.svg',
    },
  },
  {
    id: 3,
    label: 'Usuários',
    path: '/usuarios',
    icon: {
      alt: 'ícone de smartphone',
      src: '/cellphone-user-icon.svg',
      srcSelected: '/cellphone-user-icon-selected.svg',
    },
  },
];

export const COLOR_UNSELECTED = '#525252';
export const COLOR_SELECTED = '#4379C1';

export const getColor = (id: number, menuSelectedId: number) =>
  (menuSelectedId !== id && COLOR_UNSELECTED) || COLOR_SELECTED;
