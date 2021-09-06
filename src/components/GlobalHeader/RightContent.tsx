import type { Settings as ProSettings } from '@ant-design/pro-layout';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import type { ConnectProps /* SelectLang */ } from 'umi';
import { connect /* SelectLang */, history } from 'umi';
import type { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { hotWords } from '@/pages/searchResult';

export interface GlobalHeaderRightProps extends Partial<ConnectProps>, Partial<ProSettings> {
  theme?: ProSettings['navTheme'] | 'realDark';
}

// const ENVTagColor = {
//   dev: 'orange',
//   test: 'green',
//   pre: '#87d068',
// };

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue=""
        options={hotWords}
        onSearch={(value) => history.push(`/searchResult?keyWord=${value}`)}
      />
      {/* <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip> */}
      <Avatar />
      {/* {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )} */}
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
