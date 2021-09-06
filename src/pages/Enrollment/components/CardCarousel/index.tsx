import React from 'react';
import ultimateAward2 from '@/assets/enrollment/ultimateAward2.png';
import ultimateAward1 from '@/assets/enrollment/ultimateAward1.png';
import ultimateAward3 from '@/assets/enrollment/ultimateAward3.png';
// import { Carousel } from 'antd';
import Slider from 'react-slick';
import styles from './index.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const awardImages: string[] = [ultimateAward2, ultimateAward1, ultimateAward3];

const settings = {
  centerMode: true,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  style: { width: '60%', margin: '0 auto' },
};

const CardCarousel = () => {
  return (
    <div className={styles['type-carousel']}>
      <Slider {...settings}>
        {awardImages.map((item) => (
          <div style={{ width: 232, height: 288 }} className="image-div" key={item}>
            <img src={item} alt="" className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
