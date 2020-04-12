import {MenuItem} from 'primeng/api/menuitem';

export function accountMenu(onSignout: () => void): MenuItem[] {
  return [
    {
      label: 'Profile',
      routerLink: ['/']
    },
    {
      label: 'Sign out',
      command: onSignout
    }
  ];
}
