import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { baseUrl, cu5gaia } from '@/config/env';
import { unionConstitution } from '@/services/lib';
import styles from './index.less';

const Constitution = () => {
  const [constitutionText, setConstitutionText] = useState(
    `<p class=${styles.loading}>正在加载中...</p>`,
  );

  useEffect(() => {
    (async () => {
      const result = await unionConstitution();
      if (result.status === 200) {
        setConstitutionText(result.data.unionConstitution);
      }
    })();
  }, []);

  return (
    <div className={styles['introduce-constitution']}>
      <div className={styles.header}>
        <div className={styles.title}>5G创新联盟章程</div>
        <Button className={styles.download}>
          <a
            href={
              `${baseUrl}/${cu5gaia}/lib/whiteBook/download?` +
              'fileKey=application/202008/中国联通5G应用创新联盟章程.pdf&type=attachment&id=698'
            }
          >
            <i className="iconfont icondownload" />
            5G创新联盟章程下载
          </a>
        </Button>
      </div>
      <div
        className={styles['constitution-text']}
        dangerouslySetInnerHTML={{ __html: constitutionText }}
      />
    </div>
  );
};

export default Constitution;
