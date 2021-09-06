import React, { useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
import ProTable from '@ant-design/pro-table';
import { GridContent } from '@ant-design/pro-layout';
import type { CurrentUser } from '@/models/user';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import type { demandType, ActionType } from './data';
import { intentionQuery } from '@/services/product';
import styles from './index.less';
import { IndusListSelect } from '@/components/ProTableColumnRender';
import { USER_PARTNER, USER_GENERAL } from '@/components/WishOrder';
import { baseUrl } from '@/config/env';
// import env from '@/config/env';

interface TableListProps {
  CurrentUser: CurrentUser;
}
interface TagOptionItem {
  value: number;
  title: string;
}

export const indusList: TagOptionItem[] = [
  { value: 1, title: '智慧能源' },
  { value: 2, title: '智慧教育' },
  { value: 3, title: '工业互联网' },
  { value: 4, title: '智慧医疗' },
  { value: 5, title: '智慧城市' },
  { value: 6, title: '智慧交通' },
  { value: 7, title: '其他' },
];

export const productList: TagOptionItem[] = [
  { value: 1, title: '大数据类' },
  { value: 2, title: '物联网类' },
  { value: 3, title: '云计算类' },
  { value: 4, title: '安全类' },
  { value: 5, title: '区块链类' },
  { value: 6, title: '其他类' },
];

const tableColumns = [
  {
    title: '需求申请单号',
    dataIndex: 'idStr',
    hideInSearch: true,
  },
  {
    title: '所属行业',
    dataIndex: 'industry',
    hideInSearch: true,
  },
  {
    title: '产品类型',
    dataIndex: 'productType',
    hideInSearch: true,
  },
  {
    title: '需求申请标题',
    dataIndex: 'title',
    hideInSearch: true,
    render: (_: any, record: any) => {
      return <span>{record.title}</span>;
    },
  },
  {
    title: '合作伙伴名称',
    dataIndex: 'companyName',
    hideInSearch: true,
  },
  {
    title: '联系人电话',
    dataIndex: 'contactPhone',
    hideInSearch: true,
  },
  {
    title: '工单状态',
    dataIndex: 'status',
    hideInSearch: true,
    valueEnum: {
      '0': {
        text: '草稿',
        status: 'draft',
      },
      '1': {
        text: '意向单填报',
        status: 'write',
      },
      '2': {
        text: '地市管理员处理',
        status: 'cityHandle',
      },
      '3': {
        text: '区县管理员处理',
        status: 'countyHandle',
      },
      '4': {
        text: '客户经理执行',
        status: 'managerHandle',
      },
      '5': {
        text: '关单',
        status: 'off',
      },
    },
  },
  {
    title: '具体应用/解决方案',
    dataIndex: 'appName',
    hideInSearch: true,
  },
];

const partnerSearchColumns: ProColumns<demandType>[] = [
  {
    title: '所属行业',
    dataIndex: 'industryId',
    hideInTable: true,
    renderFormItem: (_: any, ...rest: any) => {
      return <IndusListSelect {...rest} indusList={indusList} />;
    },
  },

  {
    title: '产品类型',
    dataIndex: 'productTypeId',
    hideInTable: true,
    renderFormItem: (_: any, ...rest: any) => {
      return <IndusListSelect {...rest} indusList={productList} />;
    },
  },
  {
    title: '需求申请标题',
    dataIndex: 'title',
    hideInTable: true,
  },
  {
    title: '合作伙伴名称',
    dataIndex: 'companyName',
    hideInTable: true,
  },
  {
    title: '联系人姓名',
    dataIndex: 'contactName',
    hideInTable: true,
  },
  {
    title: '工单状态',
    dataIndex: 'status',
    hideInTable: true,
  },
  {
    title: '具体应用/解决方案',
    dataIndex: 'appName',
    hideInTable: true,
  },
];

const generalSearchColumns = [
  {
    title: '企业名称',
    dataIndex: 'companyName',
    hideInTable: true,
  },
  {
    title: '联系人名称',
    dataIndex: 'contactName',
    hideInTable: true,
  },
];

const optionColumns: ProColumns<demandType>[] = [
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 100,
    fixed: 'right',
    render: (_: any, record: any) => {
      return (
        <a
          data-record={JSON.stringify(record)}
          data-option="detail"
          onClick={() => history.push(`/demandSquare/order/${record.idStr}`)}
        >
          查询详情
        </a>
      );
    },
  },
];

const TableList: React.FC<TableListProps> = (props: any) => {
  const actionRef: any = useRef<ActionType>();
  const [userType, setUserType] = useState<string>();

  const [columns, setColumns] = useState<ProColumns<demandType>[]>([...tableColumns]);

  const {
    user: { currentUser },
  } = props;

  useEffect(() => {
    let tempColumns = [];
    if (currentUser.message === '用户未登录') {
      tempColumns = [...tableColumns, ...generalSearchColumns, ...optionColumns];
      setUserType(USER_GENERAL);
      setColumns(tempColumns);
    } else if (currentUser.name) {
      tempColumns = [...tableColumns, ...partnerSearchColumns, ...optionColumns];
      setColumns(tempColumns);
      setUserType(USER_PARTNER);
    }
  }, [currentUser]);

  const handleDownload = (action: any, selectedRows: any) => {
    const idsArr = selectedRows.map((item: any) => item.idStr);
    window.open(`${baseUrl}/cu5gaia/lib/exportIntent?ids=${idsArr}`, '_blank');
  };

  return (
    <div className={styles['order-list-container']}>
      <div className={`${styles.table}`}>
        <GridContent>
          <h3>意向单需求列表查询</h3>
          <ProTable
            bordered
            actionRef={actionRef}
            columns={columns}
            request={(params) => intentionQuery({ ...params })}
            scroll={{ x: 1300 }}
            rowKey="idStr"
            size="middle"
            rowSelection={userType === USER_PARTNER ? {} : false}
            toolBarRender={(action, { selectedRows }) => [
              selectedRows && selectedRows.length > 0 && (
                <Button onClick={() => handleDownload(action, selectedRows)}>批量导出</Button>
              ),
            ]}
            search={{
              collapsed: false,
              collapseRender: () => null,
              optionRender: (_, { form }) => [
                <Button
                  onClick={() => {
                    form?.resetFields();
                  }}
                  style={{ marginRight: 8 }}
                  className="reset-btn"
                  key="reset-btn"
                >
                  重置
                </Button>,
                <Button
                  type="primary"
                  onClick={() => form?.submit()}
                  className="search-btn"
                  key="search-btn"
                >
                  查询
                </Button>,
              ],
            }}
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: (total) => `共${total}条`,
            }}
          />
        </GridContent>
      </div>
    </div>
  );
};

export default connect(({ user }: { user: any }) => ({ user }))(TableList);
