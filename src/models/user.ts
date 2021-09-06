import type { Effect } from 'umi';
import type { Reducer } from 'redux';
import cryptoUtils from '@/utils/crypto';
import { queryCurrent, query as queryUsers } from '@/services/user';
import { getQueryVariable } from '@/utils/utils';
import request from '@/utils/request';
import { setAuthority } from '@/utils/authority';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
  message?: string;
  stpartyCode?: string;
  id?: string;
  login?: string;
  type?: string;
  status?: string;
  email?: string;
  phone?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  subscriptions?: {
    setup: Effect;
  };
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const authSessionId =
        getQueryVariable('authSessionId', window.location.search) || 'undefined';
      const encryptResponse = yield call(queryCurrent, { authSessionId });

      // 未加密时，mock数据
      if (typeof encryptResponse === 'object') {
        yield put({
          type: 'saveCurrentUser',
          payload: encryptResponse,
        });
        setAuthority(encryptResponse.type);
      } else {
        // 加密的，生产数据
        const JSONResponse = cryptoUtils.aesDecryptUrl(encryptResponse);

        const response = JSON.parse(JSONResponse);
        setAuthority(response.type);

        // request拦截器, 改变url 或 options.
        request.interceptors.request.use((url, options: any) => {
          return {
            url,
            options: {
              ...options,
              headers: {
                ...options.headers,
                authSessionId: authSessionId || response.remark?.split('&')[1] || '',
                loginToken: response.remark?.split('&')[0] || '',
              },
            },
          };
        });

        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
