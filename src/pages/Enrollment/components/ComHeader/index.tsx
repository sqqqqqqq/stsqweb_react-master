import React from 'react';
import styles from './index.less';

export default (props: { title: string; color?: string }) => {
  const { title, color } = props;

  return (
    <div className={styles['com-header']} style={{ color }}>
      {title}
    </div>
  );
};
