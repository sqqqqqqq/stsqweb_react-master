import request, { apiPrefix } from '@/utils/request';

const apiPrefixLib = `${apiPrefix}/lib`;
const apiPrefixLog = `${apiPrefix}/log`;

interface TrendParamsType {
  size: number;
  status: string;
  page: number;
}

export async function getTrend(params: TrendParamsType) {
  return request.get(`${apiPrefixLib}/trend/recommendations/page`, {
    params,
  });
}

export async function getCase(params: TrendParamsType) {
  return request.get(`${apiPrefixLib}/case/recommendations/page`, {
    params,
  });
}

export async function getDetail(params: any) {
  const { clazz } = params;
  return request.get(`${apiPrefixLib}/${clazz}/detail`, {
    params,
  });
}

export async function getWhiteBook(params: TrendParamsType) {
  return request.get(`${apiPrefixLib}/whiteBook/recommendations/page`, {
    params,
  });
}

export async function whiteBookDictionary(params: any) {
  return request.get(`${apiPrefixLib}/whiteBook/getAllDictionaryByClazz`, {
    params,
  });
}

export async function getPreviewData(params: any) {
  return request.get(`${apiPrefixLib}/preview/getPreviewData`, {
    params,
  });
}

export async function libSave(params: any) {
  const { clazz } = params;
  return request(`${apiPrefixLib}/${clazz}/save`, {
    method: 'POST',
    data: params,
  });
}

export async function updateTrendPraise(params: any) {
  return request(`${apiPrefixLog}/praise/praiseNews`, {
    method: 'POST',
    data: params,
  });
}

export async function queryUserInfo(params: any) {
  const { clazz } = params;
  return request(`${apiPrefixLib}/${clazz}/userInfo`, {
    method: 'POST',
    data: params,
  });
}
