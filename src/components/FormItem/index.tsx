import React from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import UploadFile from '@/components/UploadFile';
import styles from './index.less';
import type {
  FormItemCheckboxType,
  FormItemDatePickerType,
  FormItemRadioType,
  FormItemSearchType,
  FormItemSelectType,
  FormItemTextAreaType,
  FormItemTextType,
  FormItemUploadFilesTypes,
  FormListGroupType,
  FormStepBtnProps,
  RenderItemColumnConfig,
  RenderItemConfigIn,
  RenderItemConfigOut,
} from '@/components/FormItem/interface';
import { MinusCircleOutlined } from '@ant-design/icons';
import type { OptionProps } from 'antd/es/select';

const { Search, TextArea } = Input;

const { Option } = Select;

function FormStepBtn(props: FormStepBtnProps) {
  const { config } = props;
  return (
    <Row justify="center">
      {config.map(({ span, key, type, htmlType, onClick, loading, text, style, ...rest }) => (
        <Col span={span} key={key}>
          <Form.Item>
            <Button
              type={type}
              htmlType={htmlType}
              onClick={onClick}
              loading={loading}
              style={{ ...style }}
              {...rest}
            >
              {text}
            </Button>
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
}

function FormTitle(props: { title: string; className?: string }) {
  const { title, className } = props;
  return <p className={`${className} ${styles['com-item']}`}>{title}</p>;
}

function FormItemSearch(props: FormItemSearchType) {
  const { config, search } = props;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className} ${styles['com-item']}`}>
      <Search {...search} />
    </Form.Item>
  );
}

function FormItemNone(props: FormItemTextType) {
  const { config } = props;

  config.colon = config.colon || false;

  return (
    <Form.Item {...config} style={{ display: 'none' }}>
      <></>
    </Form.Item>
  );
}

function FormItemText(props: FormItemTextType) {
  const { config } = props;

  const inputConfig = {
    disabled: config.disabled,
    placeholder: config.placeholder,
  };

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className} ${styles['com-item']}`}>
      <Input {...inputConfig} />
    </Form.Item>
  );
}

function FormItemSelect(props: FormItemSelectType) {
  const { config, select } = props;

  const { option } = select;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className} ${styles['com-item']}`}>
      <Select {...select} placeholder={select.placeholder || '请选择'}>
        {option.map((item: OptionProps) => (
          <Option value={item.value} key={item.key || item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

function FormItemCheckbox(props: FormItemCheckboxType) {
  const { config, checkbox } = props;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className} ${styles['com-item']}`}>
      <Checkbox.Group {...checkbox} />
    </Form.Item>
  );
}

function FormItemRadio(props: FormItemRadioType) {
  const { config, radio } = props;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className} ${styles['com-item']}`}>
      <Radio.Group {...radio}>
        {radio.options?.map((item: any) => {
          return (
            <Radio value={item.value} key={item.key}>
              {item.label}
            </Radio>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
}

function FormItemDatePicker(props: FormItemDatePickerType) {
  const { config, date } = props;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className} ${styles['com-item']}`}>
      <DatePicker {...date} />
    </Form.Item>
  );
}

function FormItemTextArea(props: FormItemTextAreaType) {
  const { config, textarea } = props;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config} className={`${config.className}`}>
      <TextArea {...textarea} />
    </Form.Item>
  );
}

function FormItemUploadFiles(props: FormItemUploadFilesTypes) {
  const { config, uploadFiles } = props;

  // 去掉label的冒号
  config.colon = config.colon || false;

  return (
    <Form.Item {...config}>
      <UploadFile {...uploadFiles} />
    </Form.Item>
  );
}

function RenderFormItemColumn(props: { columnConfig: RenderItemColumnConfig }) {
  const {
    columnConfig: {
      type,
      config,
      select,
      search,
      checkbox,
      radio,
      list,
      date,
      textarea,
      uploadFiles,
    },
  } = props;

  return (
    <>
      {type === 'none' ? <FormItemNone config={config} /> : null}

      {type === 'text' ? <FormItemText config={config} /> : null}

      {/* Search */}
      {type === 'search' && search ? <FormItemSearch config={config} search={search} /> : null}

      {/* Select */}
      {type === 'select' && select ? <FormItemSelect config={config} select={select} /> : null}

      {/* Checkbox */}
      {type === 'checkbox' && checkbox ? (
        <FormItemCheckbox config={config} checkbox={checkbox} />
      ) : null}

      {/* Radio */}
      {type === 'radio' && radio ? <FormItemRadio config={config} radio={radio} /> : null}

      {/* List */}
      {type === 'list' && list ? <FormItemList config={config} list={list} /> : null}

      {/* date */}
      {type === 'date' && date ? <FormItemDatePicker config={config} date={date} /> : null}

      {/* textarea */}
      {type === 'textarea' && textarea ? (
        <FormItemTextArea config={config} textarea={textarea} />
      ) : null}

      {/* uploadFiles */}
      {type === 'uploadFiles' && uploadFiles ? (
        <FormItemUploadFiles config={config} uploadFiles={uploadFiles} />
      ) : null}
    </>
  );
}

function FormItemList(props: FormListGroupType) {
  const { config, list } = props;

  const { name } = config;

  const changeTypeName: any = name;

  return (
    <Form.List name={changeTypeName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Row key={field.key} justify="center">
              {list.map((item: RenderItemConfigIn) => (
                <Col span={Math.floor(22 / list.length)} key={item.key}>
                  <RenderFormItemColumn
                    columnConfig={{
                      ...item,
                      config: {
                        ...field,
                        ...item.config,
                        name: [field.name, item.config.name],
                        fieldKey: [field.fieldKey, item.config.name],
                      },
                    }}
                  />
                </Col>
              ))}
              <Col span={2} offset={1}>
                <MinusCircleOutlined
                  onClick={() => remove(field.name)}
                  style={{ marginTop: '15px' }}
                />
              </Col>
            </Row>
          ))}

          <FormStepBtn
            config={[{ onClick: () => add(), text: '新增', htmlType: 'button', key: '1' }]}
          />
        </>
      )}
    </Form.List>
  );
}

// 根据配置渲染FormItem
function renderFormItemRow(rowColumns: RenderItemConfigOut[]) {
  return rowColumns.map((father: RenderItemConfigOut) => {
    return (
      <Row key={father.key} gutter={father.gutter}>
        {father.children.map((item: RenderItemConfigIn) => {
          return (
            <Col
              span={item.span || Math.floor(24 / father.children.length)}
              key={item.key}
              style={item.style}
            >
              <RenderFormItemColumn columnConfig={item} />
            </Col>
          );
        })}
      </Row>
    );
  });
}

// 给表单初始化值赋值
function initialFormValue(sourceArr: RenderItemConfigOut[]) {
  const obj = {};
  sourceArr.forEach((item1) => {
    item1.children.forEach((item2) => {
      if (item2.type === 'select') {
        obj[item2.config.name] = undefined;
      } else {
        obj[item2.config.name] = '';
      }
    });
  });
  return obj;
}

export {
  FormStepBtn,
  FormTitle,
  FormItemSearch,
  FormItemText,
  FormItemSelect,
  FormItemCheckbox,
  FormItemRadio,
  FormItemList,
  renderFormItemRow,
  FormItemDatePicker,
  FormItemTextArea,
  FormItemUploadFiles,
  initialFormValue,
};
