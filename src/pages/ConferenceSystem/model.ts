import type { AnyAction, Reducer } from 'redux';
import type { EffectsCommandMap } from 'dva';
// import { message } from 'antd';
import moment from 'moment';
import { submitConferenceInfo, getConference } from '@/services/conferenceSystem';
import { notification } from 'antd';
import type {
  ApplicantOrderType,
  ParticipantType,
  HotelInfoType,
  LiveInfoType,
  TransferInfoType,
} from './data';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConferenceSystemState) => T) => T },
) => void;

// 规定state的格式
export interface ConferenceSystemState {
  initCodeList: string[];
  role: string; // 操作用户角色
  currentStep: number; // 当前步骤
  HotelStep: string; // 酒店信息录入步骤
  applicantOrder: ApplicantOrderType; // 参会人填报页面信息
  HotelList: HotelInfoType[]; // 酒店列表
  selectedHotel: HotelInfoType; // 所选酒店
  liveInfo: LiveInfoType; // 酒店入住信息
  isNeedHotel: boolean; // 是否需要酒店
  isNeedTransfer: boolean; // 是否需要接送
  transferInfoList: TransferInfoType[]; // 接送信息
  showSubmitModal: boolean;
  submiting: boolean;
  showSuccessInfoModal: boolean;
  justShow: boolean;
  initSpinVisible: boolean;
  meetingTime: string | undefined;
}

interface ConferenceSystemModelType {
  namespace: 'ConferenceSystemModel';
  state: ConferenceSystemState;
  reducers: {
    updateState: Reducer<ConferenceSystemState>;
  };
  effects: {
    init: Effect;
    updateParticipantList: Effect;
    submit: Effect;
  };
}

const ConferenceSystemModel: ConferenceSystemModelType = {
  namespace: 'ConferenceSystemModel',
  state: {
    initCodeList: [],
    role: 'ordinary',
    currentStep: 0,
    HotelStep: 'SelectHotel',
    isNeedHotel: false,
    isNeedTransfer: false,
    showSubmitModal: false,
    showSuccessInfoModal: false,
    justShow: false,
    submiting: false,
    initSpinVisible: false,
    applicantOrder: {
      participantList: [{}],
    },
    HotelList: [],
    selectedHotel: {},
    liveInfo: {},
    transferInfoList: [],
    meetingTime: undefined,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ payload }, { put, call }) {
      console.log('init');
      const { orderId, orderType, mode } = payload;
      let paramsOrderType;
      if (orderType === 'hotel') {
        paramsOrderType = 'SelectedHotel';
      } else {
        paramsOrderType = 'PickUp';
      }
      const res = yield call(getConference, {
        orderId,
        orderType: paramsOrderType,
        mode: mode === 'edit' ? 'edit' : 'show',
      });
      if (res.status === 200) {
        const { applicantOrder, selectedHotel, liveInfo, transferInfoList } = res.data;
        const { participantList } = applicantOrder;
        const initCodeList: any[] = [];
        const newParticipantList = participantList.map((participantItem: ParticipantType) => {
          initCodeList.push(participantItem.invitationCode);
          return { ...participantItem, isSelected: participantItem.isLive === '1' };
        });
        // 转换接送时间
        const newTransferInfoList: TransferInfoType[] = [];
        transferInfoList?.map((info: TransferInfoType) => {
          newTransferInfoList.push({ ...info, pickupTime: moment(info.pickupTime) });
          return '';
        });
        yield put({
          type: 'updateState',
          payload: {
            initCodeList,
            // 数据
            applicantOrder: {
              ...applicantOrder,
              participantList: newParticipantList,
            },
            selectedHotel,
            liveInfo,
            transferInfoList: newTransferInfoList,
            // 控制页面组件
            currentStep: liveInfo !== undefined && orderType === 'pickup' ? 2 : 1,
            isNeedHotel: liveInfo !== undefined,
            isNeedTransfer: newTransferInfoList !== undefined && newTransferInfoList.length !== 0,
            HotelStep: paramsOrderType || 'SelectHotel',
            showSubmitModal: false,
            submiting: false,
            showSuccessInfoModal: false,
            initSpinVisible: false,
          },
        });
      } else {
        notification.error({
          message: 'Error',
          description: res.message,
        });
      }
      // 通过会务订单id查询ApplicantOrder，根据有没有客户经理信息设置role，
      // 通过ApplicantOrder.creditCode查询企业信息，若不是理事会成员，设置isNeedTransfer=false，
      // 根据参会人信息的is_live，设置isNeedHotel，
      // 根据liveInfo，设置被选酒店信息
      // 根据回传的步骤，修改currentStep，HotelStep,
      // 提交成功
    },
    *updateParticipantList({ payload }, { put, select }) {
      const { invitationCodeList } = payload;

      const participantList = yield select((state: any) => {
        return state.ConferenceSystemModel.applicantOrder.participantList;
      });
      const applicantOrder = yield select((state: any) => {
        return state.ConferenceSystemModel.applicantOrder;
      });

      const newParticipantList = participantList.map((participantItem: ParticipantType) => {
        if (invitationCodeList.indexOf(participantItem.invitationCode) !== -1) {
          return { ...participantItem, isSelected: !participantItem.isSelected };
        }
        return participantItem;
      });
      yield put({
        type: 'updateState',
        payload: {
          applicantOrder: { ...applicantOrder, participantList: newParticipantList },
        },
      });
    },
    *submit(_, { call, select, put }) {
      const applicantOrder = yield select((state: any) => {
        return state.ConferenceSystemModel.applicantOrder;
      });
      const liveInfo = yield select((state: any) => {
        return state.ConferenceSystemModel.liveInfo;
      });
      const transferInfoList = yield select((state: any) => {
        return state.ConferenceSystemModel.transferInfoList;
      });
      const initCodeList = yield select((state: any) => {
        return state.ConferenceSystemModel.initCodeList;
      });
      const currentStep = yield select((state: any) => {
        return state.ConferenceSystemModel.currentStep;
      });
      const newCurrentStep = currentStep + 1;
      let liveTime: any;
      if (liveInfo) {
        liveTime = liveInfo?.liveTime;
        delete liveInfo?.liveTime;
      }
      const res = yield call(submitConferenceInfo, {
        initCodeList,
        applicantOrder,
        liveInfo: liveInfo === undefined ? undefined : { ...liveInfo, ...liveTime },
        transferInfoList,
      });
      if (res.status === 200) {
        // 提交成功
      } else {
        notification.error({
          message: 'Error',
          description: res.message,
        });
      }
      yield put({
        type: 'updateState',
        payload: {
          showSubmitModal: false,
          submiting: false,
          showSuccessInfoModal: res.status === 200,
          currentStep: res.status === 200 ? newCurrentStep : currentStep,
        },
      });
    },
  },
};

export default ConferenceSystemModel;
