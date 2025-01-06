import React from 'react';
import { IconType } from 'react-icons';
export interface MenuItem {
  path: string;
  label: string;
  icon?: React.ReactNode | IconType;
  component?:
    | React.LazyExoticComponent<React.ComponentType>
    | React.ComponentType;
  children?: MenuItem[];
}
