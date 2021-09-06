import React from 'react';
import styles from './index.less';

const AItitle = (titleProps: any) => {
  const { title } = titleProps;
  return (
    <div className={styles.AItitle}>
      <h3>{title}</h3>
    </div>
  );
};
export default AItitle;
