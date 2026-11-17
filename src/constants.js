// Game Constants: Roles and Themes

export const ROLES = {
  BABU: {
    id: 'babu',
    titleEn: 'Babu',
    titleBn: 'বাবু / সাহেব',
    icon: '👑',
    points: 1000,
    className: 'role-babu'
  },
  POLICE: {
    id: 'police',
    titleEn: 'Police',
    titleBn: 'পুলিশ',
    icon: '👮',
    points: 800,
    className: 'role-police'
  },
  DAKAT: {
    id: 'dakat',
    titleEn: 'Dakat',
    titleBn: 'ডাকাত',
    icon: '🦹',
    points: 600,
    className: 'role-dakat'
  },
  CHOR: {
    id: 'chor',
    titleEn: 'Chor',
    titleBn: 'চোর',
    icon: '🥷',
    points: 0, // Configurable to 400
    className: 'role-chor'
  }
};

export const THEMES = [
  { id: 'khata', label: 'Vintage Khata', icon: '📜', bodyClass: '' },
  { id: 'white', label: 'Ruled White', icon: '📝', bodyClass: 'theme-white' },
  { id: 'blank', label: 'Blank White', icon: '📄', bodyClass: 'theme-blank' },
  { id: 'chalk', label: 'Slate Dark', icon: '⬛', bodyClass: 'theme-chalk' }
];
