import React, { CSSProperties, Suspense, useState } from 'react';
import { Button, Flex, Layout, Menu, Spin, theme, Tooltip } from 'antd';
import { RiMenu4Line } from 'react-icons/ri';
import { BsGithub, BsHeartFill, BsMoon, BsSun, BsXLg } from 'react-icons/bs';
import { useIsDarkStore } from '@/stores/is-dark.ts';
import { toAntdMenuItems } from '@/utils/menu.ts';
import { popupMenuItems } from '@/constants/popup-menu-items.ts';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useLoadingStore } from '@/stores/loading.ts';
import useWindowSize from '@/hooks/window-size.tsx';
import { DEFAULT_WINDOW_WIDTH } from '@/constants/window-size.ts';
interface RenderMenuProps {
  onLocationChange?: (path: string) => void;
}
const RenderMenu = React.memo(
  ({ onLocationChange }: RenderMenuProps): React.JSX.Element => {
    const navigate = useNavigate();
    const handleClick = ({ key }: { key: string }): void => {
      navigate(key);
      onLocationChange?.(key);
    };

    return (
      <Menu
        mode="inline"
        items={toAntdMenuItems(popupMenuItems)}
        defaultSelectedKeys={['/']}
        defaultOpenKeys={['/']}
        onClick={handleClick}
      />
    );
  },
);
RenderMenu.displayName = 'RenderMenu';
const ToggleTheme = React.memo(function ToggleTheme() {
  const { isDark, toggleDarkMode } = useIsDarkStore();
  return (
    <Button
      onClick={toggleDarkMode}
      icon={isDark ? <BsSun /> : <BsMoon />}
      shape={'circle'}
      type={'dashed'}
    />
  );
});
const styles: Record<string, CSSProperties> = {
  sider: {
    height: '100vh',
  },
  content: {
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarGutter: 'stable',
    scrollbarWidth: 'thin',
    margin: 5,
    padding: 5,
    height: 'calc(100vh - 10px)',
  },
  toggleButton: {
    position: 'absolute',
    zIndex: 999,
    insetInlineEnd: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
  },
};
export default function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { width } = useWindowSize();
  const [collapsed, setCollapsed] = useState(true);
  const onLocationChange = () => {
    if (width <= DEFAULT_WINDOW_WIDTH) {
      setCollapsed(true);
    }
  };
  const location = useLocation();
  const { isLoading } = useLoadingStore();
  return (
    <Layout>
      <Layout.Sider
        theme={'light'}
        width={320}
        collapsedWidth={0}
        defaultCollapsed={true}
        onCollapse={setCollapsed}
        collapsed={collapsed}
        style={styles.sider}
      >
        <Flex
          vertical
          justify={'space-between'}
          style={{
            height: '100vh',
          }}
        >
          <div
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'thin',
              scrollbarGutter: 'stable',
            }}
          >
            <RenderMenu onLocationChange={onLocationChange} />
          </div>
          <Flex
            gap={5}
            align={'center'}
            justify={'space-between'}
            style={{
              padding: '10px 5px',
            }}
          >
            <Flex align={'center'} gap={5}>
              {import.meta.env.WXT_REPOSITORY_URL && (
                <Button
                  href={import.meta.env.WXT_REPOSITORY_URL}
                  target={'_blank'}
                  icon={<BsGithub />}
                  shape={'circle'}
                  type={'dashed'}
                />
              )}
              {import.meta.env.WXT_DONATION_URL && (
                <Tooltip title={i18n.t('donation.description')}>
                  <Button
                    href={import.meta.env.WXT_DONATION_URL}
                    target={'_blank'}
                    icon={
                      <BsHeartFill
                        style={{
                          color: 'red',
                        }}
                      />
                    }
                    type={'dashed'}
                    shape={'round'}
                  >
                    {i18n.t('donation.title')}
                  </Button>
                </Tooltip>
              )}
            </Flex>
            <ToggleTheme />
          </Flex>
        </Flex>
      </Layout.Sider>
      <Layout.Content>
        <div style={styles.toggleButton}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            size={'large'}
            shape={'circle'}
            icon={collapsed ? <RiMenu4Line /> : <BsXLg />}
            className={'btn-toggle-sider'}
          />
        </div>
        <div
          style={{
            ...styles.content,
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense
            key={location.key}
            fallback={<Spin fullscreen size={'large'} />}
          >
            {isLoading && (
              <Flex
                style={{
                  width: '100%',
                  height: '100%',
                }}
                align={'center'}
                justify={'center'}
              >
                <Spin />
              </Flex>
            )}
            <div
              style={{
                display: isLoading ? 'none' : 'block',
              }}
            >
              <Outlet />
            </div>
          </Suspense>
        </div>
      </Layout.Content>
    </Layout>
  );
}
