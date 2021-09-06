import request, { apiPrefix } from '@/utils/request';

const apiPrefixLib = `${apiPrefix}/lib`;

// ! =================1-产品意向单=================
// 根据产品id查询产品信息
export async function queryProduct(params: any) {
  return request(`/product/api/v1/products/${params.id}`);
}

// 产品意向单下单
export async function intentionOrder(data: any) {
  return request('/product/api/v1/intentionOrderReceive', {
    method: 'POST',
    data,
  });
}

interface sendMessageCodeType {
  phone: string;
  productItemId: number;
}

// 产品意向单短信接口
export async function sendProductMsgCode(params: sendMessageCodeType) {
  return request(`/product/api/v1/sendSms`, {
    params,
  });
}
// 意向单列表查询
export async function intentionQuery(params: any) {
  return request.get(`${apiPrefixLib}/getIntentList`, {
    params,
  });
}
