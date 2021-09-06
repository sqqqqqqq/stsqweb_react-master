/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '@/components/GlobalHeader/Logo';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './comStyle.less';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  user: any;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
  return menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      className={`${
        window.location.href.indexOf('checkOrders') >= 0
          ? styles.checkOrders
          : styles.basicLayoutContainer
      }`}
      logo={logo}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => {
        history.push('/');
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }
        // if (menuItemProps.path.indexOf('/mec/platform') !== -1)
        //   return (
        //     <a onClick={handleMenuCollapse} href={'https://119.8.57.43:30092'} target="_blank">
        //       {defaultDom}
        //     </a>
        //   );
        // if (menuItemProps.path.indexOf('/mec/appMall') !== -1)
        //   return (
        //     <a onClick={handleMenuCollapse} href={'https://119.8.57.43:30091'} target="_blank">
        //       {defaultDom}
        //     </a>
        //   );
        return <Link to={menuItemProps.path}> {defaultDom}</Link>;
      }}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => <GlobalFooter />}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      subMenuItemRender={(itemProps) => {
        return (
          <span
            onClick={() => {
              // 这两个暂无主页，无需跳转
              if (itemProps.name === '需求广场' || itemProps.name === 'MEC生态圈') {
                return;
              }
              if (itemProps.path) {
                history.push(itemProps.path);
              }
            }}
          >
            {itemProps.name}
          </span>
        );
      }}
      pageTitleRender={() => '中国联通5G应用创新联盟'}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
