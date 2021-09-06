import React, { useEffect, useState } from 'react';
import { Upload, message, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { BeforeUploadFilesType, UploadFilesType } from '@/components/FormItem/interface';
import styles from './index.less';

interface PreviewType {
  visible: boolean;
  image: string;
  title: string;
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file: any, beforeUploadTip: BeforeUploadFilesType) {
  const { fileSuffixNames, uploadFailMessage, fileMaxSize } = beforeUploadTip;
  const isFileTypeAllow = fileSuffixNames.some(
    (item) => file.type === item || new RegExp(item).test(file.name),
  );
  if (!isFileTypeAllow) {
    message.error(uploadFailMessage);
  }
  const isLtMaxSize = file.size / 1024 / 1024 < fileMaxSize;
  if (!isLtMaxSize) {
    message.error(`文件不能大于${fileMaxSize}MB!`);
  }
  return isFileTypeAllow && isLtMaxSize;
}

const UploadImage = (props: UploadFilesType) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [preview, setPreview] = useState<PreviewType>({
    visible: false,
    image: '',
    title: '',
  });

  const {
    uploadButton: { buttonText, children, ...uploadButtonRest },
    uploadFilesProps: {
      minCount = 1,
      maxCount = 1,
      listType,
      beforeUploadTip,
      formRef,
      formFieldName,
      openDownload,
      className,
      ...uploadFilesPropsRest
    },
  } = props;

  const { uploadFailMessage } = beforeUploadTip;

  useEffect(() => {
    const { value } = props;
    if (value?.fileName && value?.downloadUrl) {
      setFileList([
        {
          ...value,
          uid: 0,
          name: value.fileName,
          status: 'done',
          downloadUrl: value.downloadUrl,
        },
      ]);
    }
  }, [props]);

  const handleChange = ({ file, fileList: _fileList }: { file: any; fileList: any[] }) => {
    const { onChange } = props;

    // 被beforeUpload拦截的文件没有status属性
    if (file.status === undefined) {
      return;
    }

    setFileList(_fileList);

    if (onChange && _fileList.length >= minCount) {
      const doneFlag = _fileList.every((item) => item.status === 'done');
      // 等图片上传完了才能更新Form.Item状态
      if (doneFlag) {
        _fileList.forEach((item) => {
          if (Array.isArray(item.response.data)) {
            // eslint-disable-next-line no-param-reassign
            item.url = item.response.data[0].showImageUrl;
            // eslint-disable-next-line no-param-reassign
            item.downloadUrl = item.response.data[0].location;
            console.log(82, formFieldName, formRef);
            if (formFieldName && formRef) {
              // 与后端沟通，返回item.response.data[0].location值到formFieldName字段
              formRef.setFieldsValue({ [formFieldName]: item.response.data[0].location });
            }
          } else {
            console.log(87, formFieldName, formRef);
          }
        });
        onChange(_fileList);
      }
    } else if (onChange) {
      onChange();
    }
  };

  const handleRemove = () => {
    if (formFieldName && formRef) {
      // 与后端沟通，返回item.response.data[0].location值到formFieldName字段
      formRef.setFieldsValue({ [formFieldName]: '' });
    }
  };

  // listType为text时不预览
  const handlePreview = async (file: any) => {
    if (openDownload && file.downloadUrl) {
      const downloadUrl = `/partners/cu5gaia/lib/whiteBook/download?fileKey=${file.downloadUrl}&type=attachment&id=0`;
      window.open(downloadUrl, '_blank');
      return;
    }

    if (listType === 'text') {
      return;
    }

    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview({
      image: file.url || file.preview,
      visible: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleCancel = () => setPreview({ ...preview, visible: false });

  const uploadButton =
    listType === 'picture-card' ? (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>
          {/* 上传图片时有可能根据图片张数不同而显示不同文字，如身份证 */}
          {Array.isArray(buttonText) ? buttonText[fileList.length] : buttonText}
        </div>
      </div>
    ) : (
      <>
        <Button {...uploadButtonRest}>{buttonText}</Button>
        {children}
      </>
    );

  return (
    <>
      <Upload
        // 默认action
        action={`/partners/cu5gaia/lib/attach/upload`}
        listType={listType}
        fileList={fileList}
        beforeUpload={(file) => beforeUpload(file, beforeUploadTip)}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemove}
        className={`${styles['upload-file-container']} ${className}`}
        {...uploadFilesPropsRest}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {uploadFailMessage ? <span style={{ color: '#a9b0b4' }}>{uploadFailMessage}</span> : null}
      <Modal visible={preview.visible} title={preview.title} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={preview.image} />
      </Modal>
    </>
  );
};

export default UploadImage;
