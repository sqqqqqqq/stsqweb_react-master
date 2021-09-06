import request, { apiPrefix } from '@/utils/request';

const apiPrefixLib = `${apiPrefix}/lib`;
const apiPrefixLog = `${apiPrefix}/log`;

// 5G行业Banner部分视频展示
export async function queryBannerVideo() {
  return request.get(`${apiPrefixLib}/video/queryVideoByBanner`, {});
}

export async function videoRecommend(params) {
  return request.get(`${apiPrefixLib}/video/recommendations/page`, { params });
}

export async function videoState(params) {
  return request.get(`${apiPrefixLib}/video/queryVideoState`, {
    params,
  });
}

export async function queryUserInfo(params) {
  return request(`${apiPrefixLib}/video/userInfo`, {
    method: 'POST',
    data: params,
  });
}

export async function updateVideoPraise(params) {
  return request(`${apiPrefixLog}/praise/praiseNews`, {
    method: 'POST',
    data: params,
  });
}
