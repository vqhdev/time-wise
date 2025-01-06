import { ConfigProvider, theme, ThemeConfig, App as AntdApp } from 'antd';
import React, { useEffect } from 'react';
import AppLayout from '@/entrypoints/popup/app-layout.tsx';
import useWindowSize from '@/hooks/window-size.tsx';
import { useIsDarkStore } from '@/stores/is-dark.ts';
import { HashRouter, useRoutes } from 'react-router';
import { toReactRouterMenuItems } from '@/utils/menu.ts';
import { popupMenuItems } from '@/constants/popup-menu-items.ts';
import { isDarkMode } from '@/utils/storage.ts';
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
} from '@/constants/window-size.ts';

function RenderRoutes() {
  const routes = [
    {
      path: '/',
      element: <AppLayout />,
      children: toReactRouterMenuItems(popupMenuItems),
    },
  ];
  return useRoutes(routes);
}

function App() {
  const { isDark, setDarkMode } = useIsDarkStore();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    if (width !== DEFAULT_WINDOW_WIDTH || height !== DEFAULT_WINDOW_HEIGHT) {
      root.style.width = '100%';
      root.style.maxWidth = '800px';
      root.style.height = '100vh';
    }
  }, [width, height]);

  useEffect(() => {
    isDarkMode.getValue().then(setDarkMode);
  }, [setDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const themeConfig: ThemeConfig = React.useMemo(
    () => ({
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Menu: {
          itemBorderRadius: 0,
          subMenuItemBorderRadius: 0,
        },
      },
    }),
    [isDark],
  );
  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp>
        <HashRouter>
          <RenderRoutes />
        </HashRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
