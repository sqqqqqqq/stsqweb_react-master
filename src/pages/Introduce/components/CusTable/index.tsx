import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import styles from './index.less';

interface ColumnsType {
  title: string;
  dataIndex: string;
}

interface DataSourceType {
  name: string;
  position: string;
}

interface CusTableProps {
  columns: ColumnsType[];
  dataSource: DataSourceType[];
}

const CusTable = (props: CusTableProps) => {
  const { columns, dataSource } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataSource?.length > 0) {
      setLoading(false);
    }
  }, [dataSource]);

  return (
    <div className={styles['cus-table-container']}>
      <Table
        rowKey={(record: DataSourceType) => `${record.name}${record.position}`}
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
};

export default CusTable;
