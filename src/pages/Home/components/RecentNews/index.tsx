import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import env from '@/utils/env';
import { getAllianceNew } from '@/services/lib';
import imgLabel from '@/assets/home/label.png';
import arrowMore from '@/assets/home/arrow-right.png';
import { Link } from 'umi';
import styles from './index.less';
import { goDetailClick } from '../Achievement';

const sliderSetting = {
  dots: true,
  dotClass: 'slickMove',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const AllianceNews: React.FC = () => {
  // 轮播数据
  const [carouselData, setCarouselData] = useState<any>([
    { id: '', title: '', brief: '', time: '' },
  ]);

  useEffect(() => {
    (async () => {
      const result = await getAllianceNew({ size: '6', status: '3' });
      if (result.status === 200) {
        setCarouselData(result.data.content);
      }
    })();
  }, []);

  return (
    <div className={styles['recent-news-container']}>
      <div className={styles.sliderDiv}>
        <Slider {...sliderSetting}>
          {carouselData.map((item: any) => (
            <div className={styles.carouselItem} key={item.id}>
              <img src={env.baseUrl + item.icon} alt="alt" onClick={() => goDetailClick(item)} />
              <div>
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.dynamic}>
        <div className={styles.imgLabel}>
          <img src={imgLabel} alt="联盟动态" />
        </div>
        <div className={styles.briefList}>
          <a
            target="_blank"
            className={`${styles.title} ${styles.firstTitle}`}
            onClick={() => goDetailClick(carouselData[0])}
          >
            {carouselData[0].title}
          </a>
          <span>创建时间：{carouselData[0].time}</span>
          <span>{carouselData[0].brief}</span>
        </div>
        <ul>
          {carouselData.slice(1, 6).map((item: any) => (
            <li key={item.id}>
              <a className={styles.title} onClick={() => goDetailClick(item)}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <span className={styles.more}>
          <Link to="/trend">
            <img src={arrowMore} alt="more" />
            <span>更多</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AllianceNews;
