import React from 'react';
import type { ComponentComPropsType } from '../..';
import ApplyBtn from '../ApplyBtn';
import ComHeader from '../ComHeader';
import { baseUrl } from '@/config/env';
import bgImgUrl from '@/assets/enrollment/downloadBGImg.png';
import styles from './index.less';

interface FooterPropsType extends ComponentComPropsType {
  btnText: string;
}

interface downloadDataItemType {
  key: number;
  iconClass: string;
  type: string;
  template: string;
  link: string;
}

const downloadData: downloadDataItemType[] = [
  {
    key: 1,
    iconClass: 'iconfont iconchengyuan-selected',
    type: '团体/个人赛',
    template: '报名模板',
    link:
      '/cu5gaia/lib/whiteBook/download?fileKey=application/202006/模板（团体或个人）.docx&type=attachment&id=673',
  },
  {
    key: 2,
    iconClass: 'iconfont iconcompany',
    type: '企业赛',
    template: '报名模板',
    link:
      '/cu5gaia/lib/whiteBook/download?fileKey=application/202006/模板（企业）.docx&type=attachment&id=674',
  },
];

export default (props: FooterPropsType) => {
  const { title, id, btnText } = props;

  return (
    <div
      id={id}
      className={styles['enrollment-footer-container']}
      style={{ backgroundImage: `url(${bgImgUrl})` }}
    >
      <ComHeader title={title} />
      <div className={styles.download}>
        {downloadData.map((item: downloadDataItemType) => (
          <a key={item.key} className={styles['download-item']} href={baseUrl + item.link}>
            <i className={item.iconClass} />
            <div>
              <span>{item.type}</span>
              <span>
                {item.template}
                <i className="iconfont icondownload" />
              </span>
            </div>
          </a>
        ))}
      </div>
      <ApplyBtn btnText={btnText} />
    </div>
  );
};
