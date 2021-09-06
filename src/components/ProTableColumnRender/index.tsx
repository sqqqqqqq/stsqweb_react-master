import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

// 所属行业、产品类型查询
const IndusListSelect = (props: { onChange: (values: string[]) => void; indusList: any[] }) => {
  const { onChange, indusList } = props;
  return (
    <Select
      mode="multiple"
      onChange={(values: string[]) => {
        onChange(values);
      }}
      placeholder="请选择"
    >
      {indusList.map((item: any) => {
        return (
          <Option key={item.value} value={item.value}>
            {item.title}
          </Option>
        );
      })}
    </Select>
  );
};

export { IndusListSelect };
