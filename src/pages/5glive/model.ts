import { Reducer, Effect, history } from 'umi';
import { Modal } from 'antd';
import React, { ReactNode } from 'react';
import env from '@/utils/env';
import { videoState, updateVideoPraise, queryUserInfo } from '../../services/video';

// 规定state的格式
export interface PlayerState {
  isPlaying: boolean;
  // isLogin: boolean;
  type: string;
  poster: string;
  url: string;
  title: ReactNode;
  id: number | null;
  countPraise: number;
  countBrowse: number;
  praiseStatus: boolean;
}

interface PlayerModelType {
  namespace: 'PlayModel';
  state: PlayerState;
  reducers: {
    updateState: Reducer<PlayerState>;
  };
  effects: {
    update: Effect;
    updateNewsPraise: Effect;
  };
  subscriptions: {};
}

const PlayModel: PlayerModelType = {
  namespace: 'PlayModel',
  state: {
    isPlaying: false,
    // isLogin: false,
    type: '',
    poster: '',
    url: '',
    title: '',
    id: null,
    countPraise: 0,
    countBrowse: 0,
    praiseStatus: true,
  },
  reducers: {
    updateState(state, { payload }) {
      const { type, title } = payload;
      if (type === 'Live') {
        const titleNode = React.createElement('div', {}, [
          React.createElement(
            'span',
            { style: { fontSize: '24px', color: '#333', fontWeight: 'bold' } },
            '最新视频|',
          ),
          React.createElement('span', { style: { fontSize: '20px', color: '#333' } }, title),
        ]);
        return { ...state, ...payload, title: titleNode };
      }
      if (type === 'RePlay') {
        const titleNode = React.createElement('div', {}, [
          React.createElement(
            'span',
            { style: { fontSize: '24px', color: '#333', fontWeight: 'bold' } },
            '往期回放|',
          ),
          React.createElement('span', { style: { fontSize: '20px', color: '#333' } }, title),
        ]);
        return { ...state, ...payload, title: titleNode };
      }
      return { ...state, ...payload };
    },
  },
  effects: {
    *update({ payload }, { put, call }) {
      const { id } = payload;
      const data = yield call(videoState, { id });

      const newState = { ...data.data, ...payload };

      yield put({
        type: 'updateState',
        payload: newState,
      });
    },
    *updateNewsPraise({ payload }, { put, call, select }) {
      const userInfo = yield call(queryUserInfo);
      if (userInfo.status !== 200) {
        Modal.confirm({
          title: '提示',
          content: '请先登录',
          onOk: () => {
            window.location.href = env.loginUrl + history.location.pathname;
          },
          onCancel() {},
        });
      } else {
        const result = yield call(updateVideoPraise, payload);
        const preCountPraise = yield select((state) => {
          return state.PlayModel.countPraise;
        });
        if (result.status === 200) {
          const newState = {
            praiseStatus: payload.isPraise === '1',
            countPraise: payload.isPraise === '1' ? preCountPraise + 1 : preCountPraise - 1,
          };
          yield put({
            type: 'updateState',
            payload: newState,
          });
        }
      }
    },
  },
  subscriptions: {},
};

export default PlayModel;
