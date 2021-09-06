import React, { useState, useEffect, useRef } from 'react';
import Swiper, { SwiperRefNode } from 'react-id-swiper';
import { Dispatch, connect } from 'umi';
import 'swiper/css/swiper.css';
import env from '@/utils/env';
import { queryBannerVideo } from '@/services/video';
import styles from './index.less';

interface Props {
  dispatch: Dispatch;
}

const Carousel: React.FC<Props> = ({ dispatch }) => {
  const [carouselData, setCarouselData] = useState<any>([]);
  const gallerySwiperRef = useRef<SwiperRefNode>(null);
  const thumbnailSwiperRef = useRef<SwiperRefNode>(null);
  useEffect(() => {
    (async () => {
      const result = await queryBannerVideo();
      setCarouselData(result.data?.bannerVideo);
    })();
  }, []);

  useEffect(() => {
    const gallerySwiper = gallerySwiperRef.current?.swiper;
    const thumbnailSwiper = thumbnailSwiperRef.current?.swiper;
    gallerySwiper.update();
    thumbnailSwiper.update();

    if (gallerySwiper.controller && thumbnailSwiper.controller) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [carouselData]);

  const gallerySwiperParams = {
    spaceBetween: 10,
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  };
  const thumbnailSwiperParams = {
    updateOnImagesReady: true,
    preloadImages: false,
    slidesPerView: 3,
    loop: true,
    spaceBetween: 10,
    centeredSlides: true,
    slideToClickedSlide: true,
    containerClass: `swiper-container swiper ${styles.galleryThumbs}`,
    slideClass: `${styles.swiperSlide}`,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <div className="swiper-button-next swiper-button-white" slot="button-next" />
    ),
    renderNextButton: () => (
      <div className="swiper-button-prev swiper-button-white" slot="button-prev" />
    ),
  };

  const handleClickBanner = (item: any) => {
    dispatch({
      type: 'PlayModel/update',
      payload: {
        isPlaying: true,
        url: item.urlOrigin,
        id: item.id,
        title: item.title,
        type: item.type === null ? 'Live' : 'RePlay',
      },
    });
  };

  return (
    <div className={styles.container}>
      <Swiper {...gallerySwiperParams} ref={gallerySwiperRef}>
        {carouselData.map((item: any) => (
          <img
            className={styles.carouselImg}
            src={env.baseUrl + item.banner}
            alt="alt"
            key={item.id}
            onClick={() => handleClickBanner(item)}
          />
        ))}
      </Swiper>
      <Swiper {...thumbnailSwiperParams} ref={thumbnailSwiperRef}>
        {carouselData.map((item: any) => (
          <div key={item.id}>
            <img src={env.baseUrl + item.banner} alt="alt" />
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default connect()(Carousel);
