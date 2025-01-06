import { lazy } from 'react';
import { MenuItem } from '@/types/menu-item.ts';
import { RiTimeZoneLine } from 'react-icons/ri';

export const popupMenuItems: MenuItem[] = [
  {
    label: i18n.t('datetime.labels.timezone'),
    path: '/',
    icon: RiTimeZoneLine,
    component: lazy(() => import('@/pages/popup/timezone')),
  },
];
