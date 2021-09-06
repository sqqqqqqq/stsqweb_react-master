import type { Request, Response } from 'express';

function uploadFilesMock(req: Request, res: Response) {
  const result = {
    status: 200,
    message: '上传成功',
    data: [
      {
        id: 1186,
        fileSize: 417,
        groupId: null,
        infoId: null,
        infoType: 'image',
        location: 'image/202106/1622788997358/img1.jpg',
        nameCh: 'img1.jpg',
        status: '0',
        subInfoType: null,
        uploadTime: 1622788997580,
        userId: 100110,
        remark: null,
        showImageUrl:
          '/partners/image/202106/1622788997358/img1.jpg?Expires=1622792597&OSSAccessKeyId=ezFM9xmuC2GGA4Zm&Signature=IqNkxON%2FHwfVyPhPgrhw9fLb3cQ%3D',
      },
    ],
    succeed: true,
  };
  return res.json(result);
}

export default {
  'POST /partners/cu5gaia/lib/attach/upload': uploadFilesMock,
};
