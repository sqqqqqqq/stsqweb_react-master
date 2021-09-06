import React from 'react';
import { Card } from 'antd';
import { connect, WhiteBookState } from 'umi';
import cover from '@/assets/whitebook/1.png';
import env from '@/utils/env';
import styles from './index.less';

interface NewWhiteBookProps {
  WhiteBookModel: WhiteBookState;
}
const NewWhiteBook: React.FC<NewWhiteBookProps> = ({ WhiteBookModel }) => {
  return (
    <div className={styles.newReport}>
      <Card
        className={styles.newReportBoxCard}
        bordered={false}
        title="最新研究报告"
        headStyle={{
          fontSize: '24px',
          color: '#333',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {WhiteBookModel.latestWhiteBook.map((item: any) => (
            <div className={styles.newReportCard} key={item.id}>
              <img src={cover} alt="cover" />
              <span style={{ top: '40px', margin: '0 10px' }}>{item.title}</span>
              <div>
                下载量：{item.downloads > 100000 ? `${item.downloads / 10000}万+` : item.downloads}
              </div>
              <a
                href={`${env.baseUrl}/cu5gaia/lib/whiteBook/download?fileKey=${item.fileUrl}&type=attachment&id=${item.id}`}
              >
                <i className={`iconfont iconxiazai ${styles.iconxiazai}`} />
                下载
              </a>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ WhiteBookModel }: { WhiteBookModel: WhiteBookState }) => {
  return {
    WhiteBookModel,
  };
};
export default connect(mapStateToProps)(NewWhiteBook);
