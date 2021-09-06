import React from 'react';
import ComHeader from '../ComHeader';
import bannerUrl from '@/assets/enrollment/courseBanner.png';
import styles from './index.less';
import type { ComponentComPropsType } from '../..';

interface PropsType extends ComponentComPropsType {
  courseText: any[];
}

export default (props: PropsType) => {
  const { title, id, courseText } = props;

  return (
    <div id={id} className={styles['enrollment-course-container']}>
      <ComHeader title={title} />

      <div style={{ backgroundImage: `url(${bannerUrl})` }}>
        {courseText.map((item: { process: string; time: string }, index: number) => (
          <div key={item.process} className={styles['course-item']}>
            <div>{`0${index + 1}`}</div>
            <div>
              <span>{item.time}</span>
              <span>{item.process}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
