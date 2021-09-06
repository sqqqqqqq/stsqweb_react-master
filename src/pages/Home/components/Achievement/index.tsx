import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Link, history } from 'umi';
import env from '@/utils/env';
import { caseRecommendations, whitebookRecommend } from '@/services/lib';
import ColorfulTitle from '@/components/ColorfulTitle';
import innovationBg from '@/assets/home/bg1.png';
import whiteBookBg from '@/assets/home/bg2.png';
import styles from './index.less';

export const goDetailClick = (item: any) => {
  history.push(`/detailmsg?clazz=${item.clazz}&id=${item.id}`);
};

const Achievement = () => {
  const [innovationData, setInnovationData] = useState([{ title: '' }]);
  const [whiteBookData, setWhiteBookData] = useState([{ title: '' }]);

  const alliResultsTitle = [
    {
      id: 1,
      title: '创新应用',
      imgUrl: innovationBg,
    },
    {
      id: 2,
      title: '白皮书',
      imgUrl: whiteBookBg,
    },
  ];

  useEffect(() => {
    (async () => {
      const caseResult = await caseRecommendations({ size: '5', status: '3' });
      const whitebookResult = await whitebookRecommend({ size: '5', status: '3' });
      if (caseResult.status === 200) {
        setInnovationData(caseResult.data.content);
      }
      if (whitebookResult.status === 200) {
        setWhiteBookData(whitebookResult.data.content);
      }
    })();
  }, []);

  return (
    <div className={styles['achievement-container']}>
      <ColorfulTitle title="联盟成果" color="#1b70e4" />
      <Row gutter={24}>
        {alliResultsTitle.map((item: any) => (
          <Col span="12" key={item.id}>
            <div className={styles['achievement-item']}>
              <div className={styles.banner} style={{ backgroundImage: `url(${item.imgUrl})` }}>
                {/* <img className="imgScaleAnimate" src={item.imgUrl} alt="img" /> */}
                <span style={{ cursor: 'default' }}>{item.title}</span>
                <Link to={item.title === '创新应用' ? '/case' : 'whitebook'}>
                  <span className="more">{'更多>>'}</span>
                </Link>
              </div>
              {item.title === '创新应用' ? (
                <ul>
                  {innovationData.slice(0, 5).map((item2: any) => (
                    <li key={`${item2.id}`}>
                      {/* 创新应用跳转到详情页 */}
                      <a onClick={() => goDetailClick(item2)}>{item2.title}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {whiteBookData.slice(0, 5).map((item2: any) => (
                    <li key={`${item2.id}`}>
                      {/* 白皮书下载 */}
                      <a
                        href={`${env.baseUrlCu5gaia}/lib/whiteBook/download?fileKey=${item2.fileUrl}&type=attachment&id=${item2.id}`}
                      >
                        {item2.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Achievement;
