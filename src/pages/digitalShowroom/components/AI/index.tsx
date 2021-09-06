import React from 'react';
import styles from './index.less';
import Img from '../../../../assets/digitalShowroom/AIspecial/bigDatabanner.png';

const AI = () => {
  // const [visible, setVisible] = useState<boolean>(false);
  // const showModal = () => {
  //   setVisible(true);
  // };
  // const hideModal = () => {
  //   setVisible(false);
  // };

  return (
    <div className={styles.header} style={{ backgroundImage: `url(${Img})` }}>
      <div className={styles.headerWrap}>
        <p>大数据AI赋能</p>
        <p>
          新沃云AI能力的应用，可用于构建类似“肢体功能”的垂直功能产品，具备“职业技能”的行业应用，支撑行业的数字化转型和智能化升级。
        </p>
      </div>
    </div>
  );
};

export default AI;
