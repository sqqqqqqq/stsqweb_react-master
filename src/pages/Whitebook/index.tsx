import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import banner from '@/assets/whitebook/banner.png';
import NewWhiteBook from './components/NewWhiteBook';
import AllWhiteBook from './components/AllWhiteBook';
import styles from './index.less';

const Home: React.FC<{ dispatch: Dispatch }> = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'WhiteBookModel/init',
    });
  }, []);
  return (
    <div>
      <div className={styles.bgImageArea}>
        <img src={banner} alt="alt" />
      </div>
      <NewWhiteBook />
      <AllWhiteBook />
    </div>
  );
};

export default connect()(Home);
