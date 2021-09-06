// 参会人属性
export interface ParticipantType {
  id: string;
  name: string;
  companyId?: string;
  contactInformation: string;
  email: string;
  job: string;
  applicantId?: string;
  invitationCode: string;
  liveInfoId?: string;
  isMuslim: string;
  isLive: string;

  isPickup?: string;
  pickupStart?: string;
  pickupEnd?: string;
  pickupTime?: string;

  isSend?: string;
  sendStart?: string;
  sendEnd?: string;
  sendTime?: string;

  status?: string;
  createTime?: string;
  updateTime?: string;

  // 标记是否已选中
  isSelected: boolean;
}
// 参会人填报页面信息
export interface ApplicantOrderType {
  id: string;
  unitRole: string; // 角色
  isCouncilMember: boolean; // 是否理事会成员
  creditCode: string; // 统一信用代码
  companyId: string;
  companyName: string; // 公司名称
  industry: string; // 所属行业
  participantList: ParticipantType[]; // 参会人列表

  // 客户经理信息
  managerName: string;
  managerContactInformation: string;
  managerAreaCode: string[];
  managerAreaName: string[];
}

// 酒店信息
export interface HotelInfoType {
  id: string;
  type: string;
  name: string;
  address: string;
  description: string;
  price: string;
  sunNum: string;
  restNum: string;
  parentId: string;
  showImageUrl: string;
  url: string;
  children: HotelInfoType[];
  status: string;
  create_time: string;
  update_time: string;
}
// 入住信息中的房间信息
export interface LiveRoomInfoType {
  hotelInfoId: string;
  invitationCodeList: string[];
}

// 酒店入住信息
export interface LiveInfoType {
  id?: string;
  hotelInfoId?: string;
  applicantOrderId?: string;
  // liveTime: {
  liveStartTime?: string;
  liveEndTime?: string;
  // };
  roomList?: LiveRoomInfoType[];
  status?: string;
  createTime?: string;
  updateTime?: string;
}

// 接送信息
export interface TransferInfoType {
  id?: string;
  invitationCode: string;
  numPeople: string;
  tripNumber: string;
  upLocation: string;
  offLocation: string;
  pickupTime: any;
}
