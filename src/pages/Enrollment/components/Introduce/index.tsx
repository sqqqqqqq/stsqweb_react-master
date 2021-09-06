import React, { useEffect, useState } from 'react';
import type { ComponentComPropsType } from '../..';
import introCover from '@/assets/enrollment/intro-cover.png';
import ComHeader from '../ComHeader';
import ScoreStandard from '../ScoreStandard';
import styles from './index.less';

interface ProcessTextItemType {
  title: string;
  brief1?: string;
  brief2?: string;
  key: number;
}

const processTextInit: ProcessTextItemType[] = [
  {
    title: '背景介绍',
    brief1:
      '为进一步推动5G应用商业落地，助力信息通信业的高质量发展，由工业和信息化部主办，中国信息通信研究院联合5G' +
      '应用产业方阵、IMT-2020(5G)推进组以及中国通信标准化协会共同承办的第三届“绽放杯”5G应用征集大赛现已隆重开幕，' +
      '中国联通承办大赛“5G行业专网与应用”专题赛，旨在面向全社会征集5G专网各领域的应用实践和创新解决方案，推动5G专网与' +
      '行业融合发展，助力企业数字化转型。',
    key: 1,
  },
  {
    title: '大赛介绍及参赛范围',
    brief1:
      '大赛聚焦5G行业专网与智能应用，旨在进一步推动5G专网在工业互联网、智慧城市、数字政府、医疗、交通物流、教育、文旅、' +
      '能源、新媒体、生态环境、冬奥等各领域应用，促进5G行业专网应用产品孵化，探索5G行业专网新的商业模式。依托中国联通5G应' +
      '用创新联盟，为联盟成员优秀项目提供5G网络和应用测试环境、云应用平台资源、专家指导、商业模式创新、产品推广、资本孵化等' +
      '赋能，本着“以赛促用”的原则，打通5G应用合作链、创新链、资金链，共同促进5G产业发展。',
    brief2:
      '大赛面向全国各行业，企事业单位，科研院所，学校以及团队和个人征集5G行业专网的创新技术，智能应用及解决方案，' +
      '聚焦5G行业专网建设，展示5G行业专网的最新行业应用成果，推进产业成果转化。',
    key: 2,
  },
  {
    title: '联通赛区联系人',
    brief1: '',
    brief2: '',
    key: 3,
  },
];

interface EnrollmentIntroducePropsType extends ComponentComPropsType {
  contactPerson: string[];
}

export default (props: EnrollmentIntroducePropsType) => {
  const { title, id, contactPerson } = props;

  const [processText, setProcessText] = useState<ProcessTextItemType[]>(processTextInit);

  useEffect(() => {
    if (contactPerson?.length > 0) {
      const tempArr = [...processTextInit];
      const [brief1, brief2] = contactPerson;
      tempArr[2].brief1 = brief1;
      tempArr[2].brief2 = brief2;
      setProcessText(tempArr);
    }
  }, [contactPerson]);

  return (
    <div id={id} className={styles['enrollment-introduce-container']}>
      <ComHeader title={title} />
      <div className={styles['intro-contain']}>
        <img className={styles['intro-cover']} src={introCover} />
        <div className={styles['intro-text']}>
          <div>
            {processText.map((item: ProcessTextItemType) => (
              <div key={item.key} className={styles['process-item']}>
                <span>{item.title}</span>
                {item.brief1 ? <span dangerouslySetInnerHTML={{ __html: item.brief1 }} /> : null}
                {item.brief2 ? <span dangerouslySetInnerHTML={{ __html: item.brief2 }} /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScoreStandard />
    </div>
  );
};
