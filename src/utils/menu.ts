import { RouteObject } from 'react-router';
import React from 'react';
import { MenuProps } from 'antd';
import { MenuItem } from '@/types/menu-item';

export function toAntdMenuItems(
  items: MenuItem[],
  parentPath: string = '',
): Required<MenuProps>['items'][number][] {
  return items.map((item) => {
    const addSlash = (path: string): string =>
      path.startsWith('/') ? path : `/${path}`;
    const fullPath = parentPath
      ? `${parentPath}${addSlash(item.path)}`
      : addSlash(item.path);

    return {
      key: fullPath,
      label: item.label,
      icon:
        typeof item.icon === 'function'
          ? React.createElement(item.icon)
          : item.icon,
      children: item.children && toAntdMenuItems(item.children, fullPath),
    };
  });
}

export function toReactRouterMenuItems(items: MenuItem[]): RouteObject[] {
  return items.map((item) => ({
    path: item.path,
    element: item.component && React.createElement(item.component),
    children: item.children && toReactRouterMenuItems(item.children),
  }));
}
