import React from 'react';
import styles from './index.less';

interface ColorfulTitleType {
  title: string;
  color: string;
}

const ColorfulTitle = (props: ColorfulTitleType) => {
  const { title, color } = props;

  return (
    <div className={styles['colorful-title-container']}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      {title}
    </div>
  );
};

export default ColorfulTitle;
