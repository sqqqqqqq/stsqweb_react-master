import type { FormItemProps } from 'antd/lib/form';
import type { SearchProps, TextAreaProps } from 'antd/lib/input';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import type { ButtonProps } from 'antd/lib/button/button';
import type { RadioGroupProps } from 'antd/lib/radio';
import type { DatePickerProps, SelectProps, UploadProps } from 'antd';

// Form.Item通用config配置的type
export interface FormItemConfigType extends FormItemProps {
  name: any;
  disabled?: boolean;
  placeholder?: string;
}

// Form.Item通用config配置的type
export interface SelectOptionType {
  value: string | number;
  label: string | number;
  key: string | number;
}

export interface FormItemTextType {
  config: FormItemConfigType;
}

interface FormItemSelectType {
  config: FormItemConfigType;
  select: SelectProps;
}

interface FormItemSearchType {
  config: FormItemConfigType;
  search: SearchProps;
}

interface FormItemUploadImageType {
  config: FormItemConfigType;
  image: UploadImageType;
}

interface FormItemCheckboxType {
  config: FormItemConfigType;
  checkbox: CheckboxGroupProps;
}

interface FormItemRadioType {
  config: FormItemConfigType;
  radio: RadioGroupProps;
}

interface FormListGroupType {
  config: FormItemConfigType;
  list: RenderItemConfigIn[];
}

interface FormItemDatePickerType {
  config: FormItemConfigType;
  date: DatePickerProps;
}

interface FormItemTextAreaType {
  config: FormItemConfigType;
  textarea: TextAreaProps;
}

// 上传前操作配置信息，如文件后缀名
interface BeforeUploadFilesType {
  fileSuffixNames: string[];
  uploadFailMessage: string;
  fileMaxSize: number;
}

// 上传文件接口type
interface UploadFilesType {
  uploadButton: { buttonText: string | string[] } & ButtonProps;
  uploadFilesProps: {
    beforeUploadTip: BeforeUploadFilesType;
    formFieldName?: string; // 表单需要的字段名
    formRef?: any; // 表单引用
    openDownload?: boolean; // 开启下载，关闭预览
  } & { minCount?: number } & UploadProps; // 加一个最小上传个数，配合maxCount能指定上传文件数目
  value?: any;
  onChange?: any;
}

export interface FormItemUploadFilesTypes {
  config: FormItemConfigType;
  uploadFiles: UploadFilesType;
}

export interface FormStepBtnProps {
  config: ({
    text: string;
    key: string;
    span?: number;
  } & ButtonProps)[];
}

// 循环渲染Form.Item的函数所需的参数type
export interface RenderItemConfigOut {
  key: string;
  gutter?: number;
  children: RenderItemConfigIn[];
}

export interface RenderItemColumnConfig {
  config: FormItemConfigType;
  type:
    | 'none'
    | 'text'
    | 'select'
    | 'search'
    | 'checkbox'
    | 'radio'
    | 'list'
    | 'date'
    | 'textarea'
    | 'uploadFiles';
  select?: SelectProps;
  search?: SearchProps;
  checkbox?: CheckboxGroupProps;
  radio?: RadioGroupProps;
  list?: RenderItemConfigIn[];
  date?: DatePickerProps;
  textarea?: TextAreaProps;
  uploadFiles?: UploadFilesType;
}

// 循环渲染Form.Item的函数所需的参数的children的type
export interface RenderItemConfigIn extends RenderItemColumnConfig {
  key: string;
  style?: any;
  span?: number;
}
