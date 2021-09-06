import React, { useEffect } from 'react';
import { Menu, Spin, Button, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { connect, Dispatch, WhiteBookState } from 'umi';
import env from '@/utils/env';
import styles from './index.less';

interface AllWhiteBookProps {
  WhiteBookModel: WhiteBookState;
  dispatch: Dispatch;
  loading: boolean;
}
const AllWhiteBook: React.FC<AllWhiteBookProps> = ({ WhiteBookModel, dispatch, loading }) => {
  const windowScrollEvent = () => {
    // scrollTop 滚动条滚动时，距离顶部的距离
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // windowHeight 可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // scrollHeight 滚动条的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 滚动条到底部的条件，做个范围校验
    if (
      scrollTop + windowHeight < scrollHeight + 1 &&
      scrollTop + windowHeight > scrollHeight - 1
    ) {
      // 加载数据
      if (WhiteBookModel.hasMore && !loading) {
        dispatch({
          type: 'WhiteBookModel/loadMore',
          payload: {},
        });
        window.onscroll = null;
      }
    }
  };

  useEffect(() => {
    window.onscroll = windowScrollEvent;
  });

  const menuClick = (e: any) => {
    dispatch({
      type: 'WhiteBookModel/selectIndustry',
      payload: {
        industryId: e.key,
      },
    });
  };

  const downloadClick = (item: any) => {
    window.open(
      `${env.baseUrl}/cu5gaia/lib/whiteBook/download?fileKey=${item.fileUrl}&type=attachment&id=${item.id}`,
      '_self',
    );
  };

  return (
    <div className={styles.allWhiteBooks}>
      <div className={styles.title}>
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>全部白皮书</span>
      </div>
      <div className={styles.menu}>
        <Menu
          mode="horizontal"
          style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            borderBottom: '1px solid #e6e6e6',
            fontSize: '20px',
          }}
          onClick={menuClick}
        >
          {WhiteBookModel.whiteBookCategory.map((item: any) => (
            <Menu.Item key={item.id} style={{ color: '#909399' }}>
              {item.industryName}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <Spin indicator={<i />} spinning={loading}>
        <div className={styles.whiteBook}>
          {WhiteBookModel.allWhiteBook.map((item: any) => (
            <Card
              className={`boxCard ${styles.whiteBookCard}`}
              bodyStyle={{ padding: '10px' }}
              key={item.id}
            >
              <a
                href={`${env.baseUrl}/cu5gaia/lib/whiteBook/download?fileKey=${item.fileUrl}&type=inline&id=${item.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.section}>
                  <span>{item.title}</span>
                </div>
                <div className={styles.footer}>
                  <span>
                    {`${item.createTimeStr.slice(0, 4)}-${item.createTimeStr.slice(
                      4,
                      6,
                    )}-${item.createTimeStr.slice(6, 8)}`}
                  </span>
                  <span style={{ marginLeft: '30px', color: '#999' }}>
                    下载量：{item.downloads}
                  </span>
                </div>
              </a>
              <Button
                type="text"
                className={styles.downloadBtn}
                onClick={() => downloadClick(item)}
                icon={<DownloadOutlined />}
              >
                下载
              </Button>
            </Card>
          ))}
        </div>
        <div className={styles.loading}>
          {WhiteBookModel.hasMore && loading ? <Spin /> : ''}
          {WhiteBookModel.hasMore ? '' : '没有更多了'}
        </div>
      </Spin>
    </div>
  );
};

const mapStateToProps = ({
  WhiteBookModel,
  loading,
}: {
  WhiteBookModel: WhiteBookState;
  loading: { models: { [key: string]: boolean } };
}) => {
  return {
    WhiteBookModel,
    loading: loading.models.WhiteBookModel,
  };
};
export default connect(mapStateToProps)(AllWhiteBook);
