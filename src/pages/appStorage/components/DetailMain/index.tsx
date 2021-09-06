import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import env from '@/config/env';
import coverImgPlaceholder from '@/assets/appStorage/detailImg.png';
import styles from './index.less';

export interface DetailType {
  status: string;
  email: string;
  coverImg: string;
  title: string; // 标题
  industryName: string; // 标签
  companyName: string; // 公司名称
  createTimeStr: string; // 创建时间
  name: string;
  phoneNumber: string;
  imageList: string[] | any;
  brief: string; // 项目简介
  scenario: string; // 应用场景
  worth: string; // 项目价值
  warehouseId: string;
  id: string;
  taskId: string;
}

interface DetailMainProps {
  detail: DetailType; // 详情
  isAdminDetail?: boolean;
}

export const initDetailObj = {
  status: '1',
  email: '',
  name: '',
  phoneNumber: '',
  coverImg: '', // 封面图片
  title: '', // 标题
  industryName: '', // 标签
  companyName: '', // 公司名称
  createTimeStr: '', // 创建时间
  imageList: [],
  brief: '', // 项目简介
  scenario: '', // 应用场景
  worth: '', // 项目价值
  warehouseId: '',
  id: '',
  taskId: '',
};

const AppStorageDetail = (props: DetailMainProps) => {
  const [appCaseDetail, setAppCaseDetail] = useState<DetailType>(initDetailObj);

  const [isAdminDetail] = useState<boolean>(props.isAdminDetail || false);

  useEffect(() => {
    const { detail } = props;
    setAppCaseDetail(detail);
  }, [props]);

  const handleImageListClick = (index: number) => {
    setAppCaseDetail({ ...appCaseDetail, coverImg: appCaseDetail.imageList[index] });
  };

  return (
    <div className={styles['app-storage-detail-container']}>
      <div className={`${styles.banner} ${isAdminDetail ? styles.adminBanner : ''}`}>
        <img
          src={`${appCaseDetail.imageList?.length > 0 ? env.baseUrl : ''}${appCaseDetail.coverImg}`}
          alt="img"
        />
        <div>
          <p className={styles.title}>{appCaseDetail.title}</p>
          <Tag className={styles.tag}>{appCaseDetail.industryName}</Tag>
          <p className={styles['create-time']}>上传时间：{appCaseDetail.createTimeStr}</p>
          {appCaseDetail.imageList?.length > 0 ? (
            <ul className={styles['image-list']}>
              {appCaseDetail.imageList.map((item: any, index: number) => (
                <li key={item} onClick={() => handleImageListClick(index)}>
                  <img src={env.baseUrl + item} alt="cover" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles['image-list']}>
              <li>
                <img src={coverImgPlaceholder} alt="cover" />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div
        className={`${styles['text-container']} ${
          isAdminDetail ? styles['admin-text-container'] : ''
        }`}
      >
        <div className={isAdminDetail ? styles['admin-detail'] : ''}>
          <span className={styles['text-container-title']}>项目简介</span>
          <div dangerouslySetInnerHTML={{ __html: appCaseDetail.brief }} />
        </div>
        <div className={isAdminDetail ? styles['admin-detail'] : ''}>
          <span className={styles['text-container-title']}>应用场景</span>
          <div dangerouslySetInnerHTML={{ __html: appCaseDetail.scenario }} />
        </div>
        <div className={isAdminDetail ? styles['admin-detail'] : ''}>
          <span className={styles['text-container-title']}>项目价值</span>
          <div dangerouslySetInnerHTML={{ __html: appCaseDetail.worth }} />
        </div>
      </div>
    </div>
  );
};
export default AppStorageDetail;
