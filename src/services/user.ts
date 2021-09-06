import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(params?: any) {
  return request('/product/api/v1/user', {
    headers: {
      ...params,
    },
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
