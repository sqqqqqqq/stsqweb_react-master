import { Reducer, Effect, history } from 'umi';
import { notification, Modal } from 'antd';
import env from '@/utils/env';
import {
  getPreviewData,
  getDetail,
  libSave,
  updateTrendPraise,
  queryUserInfo,
} from '../../services/trend';

// 规定state的格式
export interface DetailState {
  // isLogin: boolean;
  previewCode: string | null;
  id: number | null;
  clazz: string | null;
  time: string | null;
  msgContextData: any;
  loading: boolean;
}

interface DetailModelType {
  namespace: 'DetailModel';
  state: DetailState;
  reducers: {
    updateState: Reducer<DetailState>;
  };
  effects: {
    init: Effect;
    save: Effect;
    updateNewsPraise: Effect;
  };
  subscriptions: {};
}

const DetailModel: DetailModelType = {
  namespace: 'DetailModel',
  state: {
    // isLogin: false,
    previewCode: null,
    id: null,
    clazz: null,
    time: null,
    msgContextData: {
      countPraise: 0,
    },
    loading: true,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ payload }, { put, call }) {
      const { previewCode, id, clazz } = payload;
      if (previewCode) {
        const result = yield call(getPreviewData, { previewCode });
        if (result.status === 200) {
          const time = result.data.createTimeStr;
          yield put({
            type: 'updateState',
            payload: {
              msgContextData: {
                ...result.data,
              },
              time: `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`,
              loading: false,
            },
          });
        } else if (result.status === 500) {
          notification.error({
            message: 'Error',
            description: result.message,
          });
        }
      } else {
        const result = yield call(getDetail, { id, clazz });
        if (result.status === 200) {
          const time = result.data.createTimeStr;
          yield put({
            type: 'updateState',
            payload: {
              ...payload,
              msgContextData: {
                ...result.data,
              },
              time: `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`,
              loading: false,
            },
          });
        } else if (result.status === 500) {
          notification.error({
            message: 'Error',
            description: result.message,
          });
        }
      }
    },
    *save({ payload }, { call, select }) {
      const { type } = payload;
      const data: any = {};
      if (type === 'submit') {
        data.status = 3;
      } else {
        data.status = 2;
      }
      data.ranged = 99;
      data.recommendation = 1;
      const msgContextData = yield select((state: any) => {
        return state.DetailModel.msgContextData;
      });
      data.newsText = msgContextData.brief;
      const result = yield call(libSave, { ...data, ...msgContextData });
      if (result.status === 200) {
        notification.success({
          message: type === 'submit' ? '提交成功' : '保存成功',
        });
      } else {
        notification.error({
          message: type === 'submit' ? '提交失败' : '保存失败',
          description: result.message,
        });
      }
    },
    *updateNewsPraise({ payload }, { put, call, select }) {
      const clazz = yield select((state: any) => {
        return state.DetailModel.clazz;
      });
      const userInfo = yield call(queryUserInfo, { clazz });

      if (userInfo.status !== 200) {
        Modal.confirm({
          title: '提示',
          content: '请先登录',
          onOk: () => {
            window.location.href =
              env.loginUrl + history.location.pathname + history.location.search;
          },
          onCancel() {},
        });
      } else {
        const result = yield call(updateTrendPraise, payload);
        const preMsgContextData = yield select((state: any) => {
          return state.DetailModel.msgContextData;
        });
        if (result.status === 200) {
          const newState = {
            msgContextData: {
              ...preMsgContextData,
              praiseStatus: payload.isPraise === '1' ? 1 : 0,
              countPraise:
                payload.isPraise === '1'
                  ? preMsgContextData.countPraise + 1
                  : preMsgContextData.countPraise - 1,
            },
          };
          yield put({
            type: 'updateState',
            payload: newState,
          });
        } else {
          notification.error({
            message: 'Error',
            description: result.message,
          });
        }
      }
    },
  },
  subscriptions: {},
};

export default DetailModel;
