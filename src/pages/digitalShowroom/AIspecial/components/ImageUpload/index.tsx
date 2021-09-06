import { Upload, message, notification } from 'antd';
import React, { PureComponent } from 'react';

import isEqual from 'lodash.isequal';
import env from '@/config/env';
import styles from './index.less';

interface TableFormProps {
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

interface TableFormState {
  loading?: boolean;
  value?: string;
  data?: string;
  imageUrl?: string;
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG/JPEG 格式图片!');
  }
  const isLt5M = file.size / 1024 / 1024 < 2;
  if (!isLt5M) {
    message.error('图片不超过2MB!');
  }
  return isJpgOrPng && isLt5M;
}

class Avatar extends PureComponent<TableFormProps, TableFormState> {
  static getDerivedStateFromProps(nextProps: TableFormProps, preState: TableFormState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  constructor(props: TableFormProps) {
    super(props);
    this.state = {
      data: props.value,
      // loading: false,
      value: props.value,
    };
  }

  handleChange = (info: any) => {
    if (info.file.status === 'error') {
      this.setState({ loading: false });
      const { response } = info.file;
      const msg = response.message || '上传失败';
      notification.error({
        message: '提示',
        description: msg,
      });
      return;
    }
    if (info.file.status === 'uploading') {
      // console.log('上传中');
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // console.log('上传成功');
      const imageUrl = info.file.response.url;
      this.setState({
        data: imageUrl,
        loading: false,
      });

      setTimeout(() => {
        const { data = 'demo' } = this.state;
        // 必须调用onChange才能更新Form.Item的对应数据
        const { onChange } = this.props;
        if (onChange) {
          onChange(data);
        }
      }, 0);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <div className="ant-upload-text">本地上传</div>
      </div>
    );

    const { data } = this.state;

    return (
      <Upload
        name="file"
        data={{ path: env.imageUploadPath }}
        listType="picture-card"
        className={styles.coverImage}
        showUploadList={false}
        action={env.imageUploadUrl}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {data ? <img src={data} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default Avatar;
