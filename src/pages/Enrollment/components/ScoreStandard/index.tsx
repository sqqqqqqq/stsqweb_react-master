import { Table } from 'antd';
import React from 'react';
import ComHeader from '../ComHeader';
import styles from './index.less';

interface tableColumnType {
  key: number;
  firstLevel: string;
  secondStandard: string;
  secondWeight: string;
  desc: string;
}

const tableData: tableColumnType[] = [
  {
    key: 1,
    firstLevel: '产品功能性(20%)',
    secondStandard: '创意性',
    secondWeight: '30%',
    desc: '项目的新颖性，产品设计的独特性，创造性。',
  },
  {
    key: 2,
    firstLevel: '产品功能性(20%)',
    secondStandard: '项目方案',
    secondWeight: '70%',
    desc: '项目技术深度、复杂度、先进性以及其在市场中的领先程度。',
  },
  {
    key: 3,
    firstLevel: '实用性(30%)',
    secondStandard: '实用性',
    secondWeight: '100%',
    desc:
      '功能合理性、实用性以及项目应用实践情况，主要包括：' +
      `<br>` +
      '1.项目落地情况：通过项目商用部署情况、应用示范规模等情况综合评定，需提供相关支持材料。' +
      `<br>` +
      '2.项目功能性演示：通过参赛项目演示视频或样品展示等方式综合评定。' +
      `<br>` +
      '3.评测情况：根据项目的第三方评估测试报告或者项目组 内部测试报告综合评定(总决赛阶段参考察)。',
  },
  {
    key: 4,
    firstLevel: '商业性(40%)',
    secondStandard: '市场分析和需求分析',
    secondWeight: '40%',
    desc:
      '1.市场容量和趋势。' +
      `<br>` +
      '2.市场需求、接受程度分析。' +
      `<br>` +
      '3.规模化生产可行性（原材料市场、工艺设备、人力资源等）。',
  },
  {
    key: 5,
    firstLevel: '商业性(40%)',
    secondStandard: '竞争分析和商业模式',
    secondWeight: '30%',
    desc:
      '1.市场定位' +
      `<br>` +
      '2.现有以及潜在竞争者对标分析。' +
      `<br>` +
      '3.替代品竞争分析。' +
      `<br>` +
      '4.产品获利方式、未来定位和发展规划' +
      `<br>` +
      '5.市场开发策略、份额预期',
  },
  {
    key: 6,
    firstLevel: '商业性(40%)',
    secondStandard: '产业联动效应',
    secondWeight: '30%',
    desc:
      '1.产品规模化生产后对产业链的影响。' +
      `<br>` +
      '2.对所应用的行业发展的影响。' +
      `<br>` +
      '3.对技术发展的预期影响。',
  },
  {
    key: 7,
    firstLevel: '社会效益(10%)',
    secondStandard: '社会效益',
    secondWeight: '100%',
    desc: '对社会服务、文化、民生等的贡献和价值',
  },
];

const column = [
  {
    title: '一级指标及权重',
    dataIndex: 'firstLevel',
    key: 'firstLevel',
    width: 150,
    render: (text: string, row: any, index: number) => {
      const obj = {
        children: text,
        props: {
          rowSpan: 0,
        },
      };
      if (index === 0) {
        obj.props.rowSpan = 2;
      } else if (index === 1) {
        obj.props.rowSpan = 0;
      } else if (index === 3) {
        obj.props.rowSpan = 3;
      } else if (index === 4 || index === 5) {
        obj.props.rowSpan = 0;
      } else {
        obj.props.rowSpan = 1;
      }
      return obj;
    },
  },
  {
    title: '二级指标',
    dataIndex: 'secondStandard',
    key: 'secondStandard',
    width: 150,
  },
  { title: '二级权重', dataIndex: 'secondWeight', key: 'secondWeight', width: 150 },
  {
    title: '指标描述',
    dataIndex: 'desc',
    key: 'desc',
    render: (text: string) => {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    },
  },
];

export default () => {
  return (
    <div className={styles['enrollment-score-standard-container']}>
      <ComHeader title="评分指标" />
      <span className={styles.note}>不允许同一作品、多个赛道报送</span>
      <div>
        <Table
          columns={column}
          dataSource={tableData}
          bordered
          pagination={false}
          scroll={{ y: 230 }}
        />
      </div>
    </div>
  );
};
