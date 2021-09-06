import React, { useEffect, useState } from 'react';
import SearchInput from '@/components/SearchInput';
import {
  searchResultAll,
  searchResultCase,
  searchResultTrend,
  searchResultWhiteBook,
} from '@/services/lib';
import { history } from 'umi';
import env from '@/config/env';
import { Button, List, Menu } from 'antd';
import styles from './index.less';

const autocompleteStyle = {
  width: '50%',
  margin: '20px 0',
};

export const hotWords = [
  { key: '5G', value: '5G' },
  { key: '智慧', value: '智慧' },
  { key: '白皮书', value: '白皮书' },
];

interface ListDataType {
  title: string;
  brief: string;
  clazz: string;
  createTimeStr: string; // 时间
  createTime: number; // 时间戳
  countBrowse: number; // 浏览量
  id: number;
  fileUrl?: string;
}

interface FetchDataParamsType {
  clazz: string;
  keyWord: string | undefined;
  page: number;
  pageSize: number;
  setListDataLoading: (param: boolean) => void;
  setListData: (param: any) => void;
  setListDataTotal: (param: number) => void;
}

const highLightKeyWorld = (params: { str: string; keyWord: string | undefined }) => {
  const { str, keyWord } = params;
  if (keyWord) {
    return str.replace(new RegExp(keyWord, 'g'), `<span style='color:#FC152E;'>${keyWord}</span>`);
  }
  return str;
};

const fetchData = (params: FetchDataParamsType) => {
  const {
    clazz,
    keyWord,
    page,
    pageSize,
    setListDataLoading,
    setListData,
    setListDataTotal,
  } = params;

  const callbackParams = {
    keyWord,
    page,
    size: pageSize,
  };

  let callback = searchResultAll;

  switch (clazz) {
    case 'case':
      callback = searchResultCase;
      break;
    case 'trend':
      callback = searchResultTrend;
      break;
    case 'whiteBook':
      callback = searchResultWhiteBook;
      break;
    default:
      break;
  }

  callback(callbackParams)
    .then((res: any) => {
      setListDataLoading(false);
      if (res.status === 200) {
        const result = res.data.content.map((item: any) => {
          return {
            ...item,
            title: highLightKeyWorld({ str: item.title, keyWord }),
            brief: item.brief ? highLightKeyWorld({ str: item.brief, keyWord }) : '',
          };
        });
        setListData(result);
        setListDataTotal(res.data.totalElements);
      }
    })
    .catch((e: any) => console.log(e));
};

const MenuItemList = [
  {
    key: 'all',
    value: '全部',
  },
  {
    key: 'case',
    value: '创新应用',
  },
  {
    key: 'trend',
    value: '联盟动态',
  },
  {
    key: 'whiteBook',
    value: '白皮书',
  },
];

const SearchResult: React.FC = (props: any) => {
  // 当前输入框搜索的值
  const [searchValue, setSearchValue] = useState<string>();

  // list数据
  const [listData, setListData] = useState<ListDataType[]>([]);

  // 当前list数据的数量
  const [listDataTotal, setListDataTotal] = useState<number>(0);

  // list的加载状态
  const [listDataLoading, setListDataLoading] = useState<boolean>(false);

  // 当前页码
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 当前菜单选中项，初始时为空，数据初始后才为all
  const [menuSelectedItem, setMenuSelectedItem] = useState<string>('all');

  const [firstRender, setFirstRender] = useState<boolean>(true);

  // 当前每页展示数据数量
  const currentPageSize = 5;

  const {
    location: {
      query: { keyWord: propsKeyWord },
    },
  } = props;

  // 初始化数据
  useEffect(() => {
    setSearchValue(propsKeyWord);
    setFirstRender(false);
  }, [propsKeyWord]);

  // 菜单选中项变化或者搜索值发生变化时
  useEffect(() => {
    if (firstRender) {
      return;
    }
    setListDataLoading(true);
    setCurrentPage(1);
    fetchData({
      clazz: menuSelectedItem,
      keyWord: searchValue,
      page: 0,
      pageSize: currentPageSize,
      setListDataLoading,
      setListData,
      setListDataTotal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuSelectedItem, searchValue]);

  // 跳页时获取该页数据
  useEffect(() => {
    if (firstRender) {
      return;
    }
    setListDataLoading(true);
    setCurrentPage(currentPage);
    fetchData({
      clazz: menuSelectedItem,
      keyWord: searchValue,
      page: currentPage - 1,
      pageSize: currentPageSize,
      setListDataLoading,
      setListData,
      setListDataTotal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const searchConfig = {
    style: {
      borderRadius: 5,
    },
    enterButton: '搜索',
    size: 'large',
    allowClear: true,
    // 点击清除icon、回车、按下搜索键时会触发该方法
    onSearch: (val: string, event: any) => {
      // 值一样时，也得重新发起请求
      const tagName = event.target.tagName.toLowerCase();
      // 点击清除icon触发时，目标是input，val值是空
      if (val === '' && tagName === 'input') {
        return;
      }
      console.log(213, val);

      if (val === searchValue) {
        setMenuSelectedItem('all');
      } else {
        setSearchValue(val);
      }
    },
  };

  const handleListItemClick = (item: ListDataType) => {
    if (item.clazz === 'case' || item.clazz === 'trend') {
      // 应用仓库详情
      history.push(`/detailmsg?clazz=${item.clazz}&id=${item.id}`);
    } else {
      // 白皮书下载
      const url =
        `${env.baseUrl}/cu5gaia/lib/whiteBook/download?` +
        `fileKey=${item.fileUrl}&type=attachment&id=${item.id}`;
      window.open(url, '_self');
    }
  };

  return (
    <div className={styles['search-result-container']}>
      <div className={styles['input-header-area']}>
        <SearchInput
          currentValue={firstRender ? propsKeyWord : searchValue}
          autocompleteStyle={autocompleteStyle}
          searchConfig={searchConfig}
        />
        <div className={styles['hot-words']}>
          <span>热词：</span>
          {hotWords.map((item: { key: string; value: string }) => (
            <Button
              key={item.key}
              type="text"
              onClick={(val: any) => setSearchValue(val.target.innerText)}
            >
              {item.value}
            </Button>
          ))}
          <Menu
            onClick={({ key }: { key: any }) => setMenuSelectedItem(key)}
            selectedKeys={[menuSelectedItem]}
            mode="horizontal"
          >
            {MenuItemList.map((item: { key: string; value: string }) => (
              <Menu.Item key={item.key}>{item.value}</Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
      <div className={styles['menu-total-number-text']}>共有{listDataTotal}条结果</div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => setCurrentPage(page),
          pageSize: currentPageSize,
          current: currentPage,
          hideOnSinglePage: true, // 只有一页时隐藏分页器
          total: listData.length > 0 ? listDataTotal : 0,
          showSizeChanger: false, // 不展示分页器
        }}
        dataSource={listData}
        loading={listDataLoading}
        footer={null}
        renderItem={(item: ListDataType) => (
          <List.Item key={item.id}>
            <a
              className="title"
              onClick={() => handleListItemClick(item)}
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <p className="content" dangerouslySetInnerHTML={{ __html: item.brief }} />

            <span>{`浏览：${item.countBrowse || 0}`}</span>

            {item.clazz === 'whiteBook' ? <span>来自：白皮书</span> : null}
            {item.clazz === 'trend' ? <span>来自：联盟动态</span> : null}
            {item.clazz === 'case' ? <span>来自：创新应用</span> : null}
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchResult;
