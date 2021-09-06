import { Reducer, Effect } from 'umi';
import { getTrend } from '../../services/trend';

// 规定state的格式
export interface TrendState {
  trendItemList: [];
}

interface TrendModelType {
  namespace: 'TrendModel';
  state: TrendState;
  reducers: {
    updateState: Reducer<TrendState>;
  };
  effects: {
    update: Effect;
  };
  subscriptions: {};
}

const TrendModel: TrendModelType = {
  namespace: 'TrendModel',
  state: {
    trendItemList: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *update({ payload }, { put, call, select }) {
      const params = {
        size: 6,
        status: '3',
        page: payload.trendDataPageCount,
      };
      const data = yield call(getTrend, params);

      const newTrendItemList = [...data.data.content];
      const preTrendItemList = yield select((state) => {
        return state.TrendModel.trendItemList;
      });
      yield put({
        type: 'updateState',
        payload: {
          trendItemList: [...preTrendItemList, ...newTrendItemList],
        },
      });
    },
  },
  subscriptions: {},
};

export default TrendModel;
