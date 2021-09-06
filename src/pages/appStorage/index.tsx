import React, { useEffect, useState } from 'react';
import { Button, Card, List, Menu, message, Tag } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { connect } from 'umi';
import { getPathName } from '@/utils/utils';
import LoginConfirm from '@/components/LoginConfirm';
import bannerBg from '@/assets/appStorage/banner@2x.png';
import storageText from '@/assets/appStorage/storage.png';
import buttonImg from '@/assets/appStorage/button.png';
import banner5G from '@/assets/appStorage/5G.png';
import env from '@/config/env';
import { getAllDictionaryByClazz, storageRecommendations } from '@/services/lib';
import FooterBanner from './components/FooterBanner';
import styles from './index.less';
import HoverButton from './components/HoverButton';

const AppStorageList = (props: any) => {
  // 菜单数据
  const [menuData, setMenuData] = useState([{ id: 0, industryName: '全部' }]);

  // list列表数据源
  const [appDataSource, setAppDataSource] = useState([]);

  // 列表加载数据页码
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 列表当前选中项key
  const [currentKey, setCurrentKey] = useState<string>('0');

  // 最初的加载状态
  const [initLoading, setInitLoading] = useState<boolean>(true);

  // 是否显示加载更多的按钮
  const [showAddMoreBtn, setShowAddMoreBtn] = useState<boolean>(true);
  // 加载更多的按钮的状态
  const [addMoreBtnLoading, setAddMoreBtnLoading] = useState<boolean>(false);

  const fetchStorageRecommendations = async (
    industryId: number,
    page: number,
    addMore: boolean = false, // 是否为加载更多
  ) => {
    setAddMoreBtnLoading(true);
    const appRes = await storageRecommendations({
      industryId,
      page,
    });
    if (appRes.status === 200) {
      setAppDataSource(addMore ? appDataSource.concat(appRes.data.content) : appRes.data.content);

      // 长度有九条，说明还有下一页
      setShowAddMoreBtn(appRes.data.content.length === 9);
    } else {
      message.error('加载行业领域数据出错，请重试~');
    }
    setAddMoreBtnLoading(false);
  };

  useEffect(() => {
    (async () => {
      const menuRes = await getAllDictionaryByClazz();
      if (menuRes.status === 200) {
        setMenuData([{ id: 0, industryName: '全部' }, ...menuRes.data.Dict]);
        fetchStorageRecommendations(0, currentPage);
        setInitLoading(false);
      } else {
        message.error('加载行业领域菜单出错，请重试~');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore =
    !initLoading && showAddMoreBtn ? (
      <Button
        type="primary"
        className={styles.loadMoreBtn}
        loading={addMoreBtnLoading}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          fetchStorageRecommendations(parseInt(currentKey, 10), currentPage + 1, true);
        }}
      >
        {addMoreBtnLoading ? '加载中...' : '加载更多'}
      </Button>
    ) : null;

  const handleImgClick = () => {
    const {
      user: { currentUser },
    } = props;

    // 已登录
    if (currentUser.name) {
      window.open(`${env.baseUrl}${env.warehouseEditUrl}`, '_self');
    } else {
      LoginConfirm({ pathname: getPathName() });
    }
  };

  return (
    <div className={styles['app-storage-container']}>
      <div className={styles['app-storage-banner']} style={{ backgroundImage: `url(${bannerBg})` }}>
        <img src={banner5G} alt="banner5G" />
        <span>应用案例寻求商机</span>
        <img src={storageText} alt="storageText" />
        <img src={buttonImg} onClick={handleImgClick} alt="buttonImg" />
      </div>
      <div className={styles['app-storage-menu-container']}>
        <span>行业领域</span>
        <Menu
          mode="horizontal"
          className={styles['app-storage-menu']}
          selectedKeys={[currentKey]}
          onClick={async (e: any) => {
            setCurrentPage(1);
            setCurrentKey(e.key);
            fetchStorageRecommendations(parseInt(e.key, 10), 1);
          }}
        >
          {menuData.map((item) => (
            <Menu.Item key={`${item.id}`}>{item.industryName}</Menu.Item>
          ))}
        </Menu>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={appDataSource}
        className={styles['app-storage-list']}
        loading={initLoading}
        loadMore={loadMore}
        renderItem={(item: any) => (
          <List.Item>
            <Card onClick={() => history.push(`/appStorage/${item.id}`)}>
              <div>{item.title}</div>
              <Tag>{item.industryName}</Tag>
              <div dangerouslySetInnerHTML={{ __html: item.brief }} />
              <span className="time">{moment(item.createTime).format('YYYY-MM-DD')}</span>
            </Card>
          </List.Item>
        )}
      />
      {/* <find-us /> */}
      <FooterBanner />
      <HoverButton />
    </div>
  );
};

// export default AppStorageList;
export default connect(({ user }: { user: any }) => ({ user }))(AppStorageList);
