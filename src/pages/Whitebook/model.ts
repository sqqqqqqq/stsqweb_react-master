import { Reducer, Effect } from 'umi';
import { getWhiteBook, whiteBookDictionary } from '../../services/trend';

// 规定state的格式
export interface WhiteBookState {
  latestWhiteBook: [];
  allWhiteBook: [];
  whiteBookCategory: [];
  activeIndex: string | null;
  pageCount: number;
  hasMore: boolean;
}

interface WhiteBookModelType {
  namespace: 'WhiteBookModel';
  state: WhiteBookState;
  reducers: {
    updateState: Reducer<WhiteBookState>;
  };
  effects: {
    init: Effect;
    selectIndustry: Effect;
    loadMore: Effect;
  };
  subscriptions: {};
}

const WhiteBookModel: WhiteBookModelType = {
  namespace: 'WhiteBookModel',
  state: {
    latestWhiteBook: [],
    allWhiteBook: [],
    whiteBookCategory: [],
    activeIndex: null,
    pageCount: 1,
    hasMore: true,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *init({ payload }, { put, call }) {
      const params = {
        size: 6,
        status: '3',
        page: 1,
      };
      const allWhiteBook = yield call(getWhiteBook, params);
      const whiteBookCategory = yield call(whiteBookDictionary);
      yield put({
        type: 'updateState',
        payload: {
          latestWhiteBook: allWhiteBook.data.content.slice(0, 5),
          allWhiteBook: allWhiteBook.data.content,
          whiteBookCategory: whiteBookCategory.data.Dict,
        },
      });
    },
    *selectIndustry({ payload }, { put, call }) {
      const params = {
        size: 6,
        status: '3',
        page: 1,
        industryId: payload.industryId,
      };
      const allWhiteBook = yield call(getWhiteBook, params);
      const hasMore = allWhiteBook.data.content.length === 6;
      yield put({
        type: 'updateState',
        payload: {
          allWhiteBook: allWhiteBook.data.content,
          pageCount: 1,
          hasMore,
          activeIndex: payload.industryId,
        },
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *loadMore({ payload }, { put, call, select }) {
      const activeIndex = yield select((state: any) => {
        return state.WhiteBookModel.activeIndex;
      });
      const page = yield select((state: any) => {
        return state.WhiteBookModel.pageCount + 1;
      });
      const params = {
        size: 6,
        status: '3',
        page,
        industryId: activeIndex,
      };
      const allWhiteBook = yield call(getWhiteBook, params);
      const hasMore = allWhiteBook.data.content.length === 6;

      const newAllWhiteBook = [...allWhiteBook.data.content];
      const preAllWhiteBook = yield select((state: any) => {
        return state.WhiteBookModel.allWhiteBook;
      });

      preAllWhiteBook.push(...newAllWhiteBook);

      yield put({
        type: 'updateState',
        payload: {
          allWhiteBook: preAllWhiteBook,
          hasMore,
          pageCount: page,
        },
      });
    },
  },
  subscriptions: {},
};

export default WhiteBookModel;
