import React, { useState, useEffect } from 'react';
import { Tabs, List, Button, Pagination, Form, Input, Row, Col, Spin, message } from 'antd';
import { history, connect } from 'umi';

// import Title from '@/assets/conferenceSystem/orders/title.png';
import backgroundSmall from '@/assets/conferenceSystem/background-small@2x.png';
import title from '@/assets/conferenceSystem/title@2x.png';
import audit from '@/assets/conferenceSystem/orders/audit.png';
import canceled from '@/assets/conferenceSystem/orders/canceled.png';
import overrule from '@/assets/conferenceSystem/orders/Overrule.png';
import pass from '@/assets/conferenceSystem/orders/pass.png';
import cryptoUtils from '@/utils/crypto';

import { getHotelOrderList, getRideOrderList, postCancelOrders } from '@/services/conferenceSystem';
import styles from './index.less';

const { TabPane } = Tabs;

interface BaseType {
  orderId: string; // 订单编号
  orderStatus: string; // 订单状态
  opinions?: string | null; // 审批意见
}

interface RoomType {
  roomType: string; // 房间类型
  guest: string[]; // 住户名字
  roomId: string;
}

interface CheckHotelOrderType extends BaseType {
  hotelName?: string; // 酒店名称
  checkInDate?: string; // 入住日期
  specification?: string; // 入住规格
  roomList?: RoomType[]; // 房间数组
}

interface CheckRideOrderType extends BaseType {
  number?: number; // 接机人数
  upLocation?: string; // 上车地点
  offLocation?: string; // 下车地点
  orderDate?: string; // 接送日期
  contactName?: string; // 联系人
  pickupId?: string; // 接送车取消订单专用id
}

const CheckOrders: React.FC = (props: any) => {
  const [orderType, setOrderType] = useState<string>('hotel'); // 订单类型
  const [current, setCurrent] = useState<number>(1); // 当前页
  const [total, setTotal] = useState<number>(100); // 订单总数
  const [hotelListData, setHotelListData] = useState<CheckHotelOrderType[]>([]); // 酒店订单
  const [rideListData, setRideListData] = useState<CheckRideOrderType[]>([]); // 接送车订单
  const [invitationCode, setInvitationCode] = useState<string | undefined>(undefined); // 邀请码
  const [managerName, setManagerName] = useState<string | undefined>(undefined); // 客户经理姓名
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [cancelIndex, setCancelIndex] = useState<number>(-1);

  const {
    user: { currentUser },
  } = props;

  const [form] = Form.useForm();

  const fetchOrderList = async (params: any) => {
    if (orderType === 'hotel') {
      (async () => {
        setIsLoading(true);
        const resHotel = await getHotelOrderList(params);
        if (resHotel.status === 200) {
          if (resHotel.succeed === true) {
            if (resHotel.data !== null) {
              setIsLoading(false);
              setHotelListData(resHotel.data.orderList);
              setTotal(resHotel.data.total);
            } else {
              setIsLoading(false);
              setHotelListData([]);
            }
          } else {
            setIsLoading(false);
            message.error(resHotel.message);
          }
        } else {
          setIsLoading(false);
          message.error('加载酒店订单数据出错，请重试~');
        }
      })();
    } else {
      (async () => {
        setIsLoading(true);
        const resRide = await getRideOrderList(params);
        if (resRide.status === 200) {
          if (resRide.succeed === true) {
            if (resRide.data !== null) {
              setIsLoading(false);
              setRideListData(resRide.data.orderList);
              setTotal(resRide.data.total);
            } else {
              setIsLoading(false);
              setRideListData([]);
            }
          } else {
            setIsLoading(false);
            message.error(resRide.message);
          }
        } else {
          setIsLoading(false);
          message.error('加载接送车订单数据出错，请重试~');
        }
      })();
    }
  };

  const invitationCodeStorage = sessionStorage.getItem('invitationCode');
  const managerNameStorage = sessionStorage.getItem('managerName');

  // 除了会务系统模块的跳转都移除sessionStorage
  history.listen((route) => {
    if (route.pathname.indexOf('conferenceSystem') < 0) {
      sessionStorage.removeItem('invitationCode');
      sessionStorage.removeItem('managerName');
    }
  });

  useEffect(() => {
    // 未登录
    if (currentUser.name === undefined) {
      // 页面刷新
      if (window.performance.navigation.type === 1) {
        sessionStorage.removeItem('invitationCode');
        sessionStorage.removeItem('managerName');
        fetchOrderList({
          current,
          pageSize: 10,
          invitationCode,
          managerName,
        });
      } else {
        if (invitationCodeStorage !== null) {
          form.setFieldsValue({ invitationCode: invitationCodeStorage });
          setInvitationCode(invitationCodeStorage);
        }
        if (managerNameStorage !== null) {
          form.setFieldsValue({ managerName: managerNameStorage });
          setManagerName(managerNameStorage);
        }
        if (
          (invitationCode === undefined && invitationCodeStorage === null) ||
          (managerName === undefined && managerNameStorage === null)
        ) {
          setHotelListData([]);
          setRideListData([]);
        } else {
          fetchOrderList({
            current,
            pageSize: 10,
            invitationCode: invitationCodeStorage === null ? invitationCode : invitationCodeStorage,
            managerName: managerNameStorage === null ? managerName : managerNameStorage,
          });
        }
      }
    } else {
      // 已登录
      fetchOrderList({
        current,
        pageSize: 10,
      });
    }
  }, [orderType, current]);

  // 订单状态图片枚举
  const statusImgEnums = {
    Audit: audit, // 审核中
    Canceled: canceled, // 已取消
    Overrule: overrule, // 不通过
    Pass: pass, // 通过
  };

  // 修改订单
  const editOrders = (index: any) => {
    sessionStorage.setItem('invitationCode', invitationCode !== undefined ? invitationCode : '');
    sessionStorage.setItem('managerName', managerName !== undefined ? managerName : '');
    const mode = cryptoUtils.aesEncryptUrl('edit');
    const editOrderId =
      orderType === 'hotel' ? hotelListData[index].orderId : rideListData[index].orderId;
    history.push(`/conferenceSystem?orderId=${editOrderId}&orderType=${orderType}&mode=${mode}`);
  };

  // 取消订单
  const cancelOrders = (index: any) => {
    (async () => {
      setIsBtnLoading(true);
      const res = await postCancelOrders({
        orderId:
          orderType === 'hotel'
            ? cryptoUtils.aesEncryptUrl(hotelListData[index].orderId)
            : cryptoUtils.aesEncryptUrl(rideListData[index].pickupId),
        orderType,
      });
      if (res.status === 200) {
        if (orderType === 'hotel') {
          setIsBtnLoading(false);
          hotelListData[index].orderStatus = 'Canceled';
          setHotelListData(() => [...hotelListData]);
        } else {
          setIsBtnLoading(false);
          rideListData[index].orderStatus = 'Canceled';
          setRideListData(() => [...rideListData]);
        }
        message.success(res.message);
      } else {
        setIsBtnLoading(false);
        message.error(res.message);
      }
    })();
  };

  const btnClick = (index: any, orderStatus: any) => {
    const statusBtnEnums = {
      Audit: (
        <div id={`btn-${orderType}-${index}`}>
          <Button
            type="primary"
            ghost
            loading={isBtnLoading && index === cancelIndex}
            onClick={(e) => {
              e.stopPropagation();
              cancelOrders(index);
              setCancelIndex(index);
            }}
          >
            取消订单
          </Button>
        </div>
      ),
      Pass: (
        <div id={`btn-${orderType}-${index}`}>
          <Button
            type="primary"
            ghost
            loading={isBtnLoading && index === cancelIndex}
            onClick={(e) => {
              e.stopPropagation();
              cancelOrders(index);
              setCancelIndex(index);
            }}
          >
            取消订单
          </Button>
        </div>
      ),
      Overrule: (
        <div id={`btn-${orderType}-${index}`}>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              editOrders(index);
            }}
            ghost
          >
            修改订单
          </Button>{' '}
          <Button
            type="primary"
            loading={isBtnLoading && index === cancelIndex}
            onClick={(e) => {
              e.stopPropagation();
              cancelOrders(index);
              setCancelIndex(index);
            }}
            ghost
          >
            取消订单
          </Button>
        </div>
      ),
      Canceled: <div />,
    };
    return statusBtnEnums[orderStatus];
  };

  const changeCurrent = (page: number) => {
    setCurrent(page);
  };

  // 订单卡片列表组件
  const OrderCard = () => {
    return (
      <div className={styles.orderCard}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={orderType === 'hotel' ? hotelListData : rideListData}
          renderItem={(item: any, index) => (
            <List.Item
              key={orderType === 'hotel' ? item.orderId : item.pickupId}
              className={styles.listItem}
            >
              <div
                className={styles.orderCard}
                onClick={() => {
                  sessionStorage.setItem(
                    'invitationCode',
                    invitationCode !== undefined ? invitationCode : '',
                  );
                  sessionStorage.setItem(
                    'managerName',
                    managerName !== undefined ? managerName : '',
                  );
                  history.push(
                    `/conferenceSystem?orderId=${
                    item.orderId
                    }&orderType=${orderType}&mode=${cryptoUtils.aesEncryptUrl('show')}`,
                  );
                }}
              >
                <div className={styles['orderCard-header']}>
                  <span>单号：{item.orderId}</span>
                  <span>|</span>
                  <span>下单日期：{item.orderDate}</span>
                </div>
                <div className={styles['orderCard-body']}>
                  {orderType === 'hotel' ? (
                    // 酒店订单卡片
                    <div className={styles['orderCard-body-left-hotel']}>
                      <div>{item.hotelName}</div>
                      <div>
                        <span>入住日期：{item.checkInDate}</span>
                        <span>{item.specification}</span>
                      </div>
                      <div>
                        {item.roomList.map((e: any, roomIndex: any) => (
                          <div key={e.roomId}>
                            <div>
                              房间{roomIndex + 1}：{e.roomType}
                            </div>
                            {e.guest.map((gst: any, guestIndex: any) => (
                              <span key={`${guestIndex + 1}`}>
                                住客{guestIndex + 1}：{gst}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                      {item.opinions === null ? null : <span className={styles.opinion}>审批意见：{item.opinions}</span>}
                    </div>
                  ) : (
                      <div className={styles['orderCard-body-left-ride']}>
                        <div>接机&nbsp;&nbsp;{item.number}人</div>
                        <span>上车：{item.upLocation}</span>
                        <span>下车：{item.offLocation}</span>
                        <span>日期：{item.pickupTime}</span>
                        <span>联系人：{item.contactName}</span>
                        {item.opinions === null ? null : <span className={styles.opinion}>审批意见：{item.opinions}</span>}
                      </div>
                    )}
                  <div className={styles['orderCard-body-right']}>
                    <img
                      // id={`img-${orderType}-${index}`}
                      src={statusImgEnums[item.orderStatus]}
                      alt={item.orderStatus}
                    />
                    {btnClick(index, item.orderStatus)}
                    {/* {statusBtnEnums[item.orderStatus]} */}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
        <div className={styles.pagination}>
          <Pagination
            hideOnSinglePage
            showQuickJumper
            total={total}
            pageSizeOptions={['10']}
            showTotal={(totalNum) => `共${totalNum}条`}
            onChange={changeCurrent}
            current={current}
          />
        </div>
      </div>
    );
  };

  // 查询条件组件（未登录使用）
  const QueryInput = () => {
    const onFinish = (values: any) => {
      sessionStorage.removeItem('invitationCode');
      sessionStorage.removeItem('managerName');
      setInvitationCode(values.invitationCode);
      setManagerName(values.managerName);
      fetchOrderList({
        current: 1,
        pageSize: 10,
        ...values,
      });
    };

    return (
      <div className={styles.checkForm}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="邀请码"
                name="invitationCode"
                rules={[{ required: true, message: '请输入邀请码!' }]}
              >
                <Input placeholder="请输入邀请码" />
              </Form.Item>
            </Col>
            <Col span={8} offset={1}>
              <Form.Item
                label="客户经理"
                name="managerName"
                rules={[{ required: true, message: '请输入客户经理姓名!' }]}
              >
                <Input placeholder="请输入客户经理姓名" />
              </Form.Item>
            </Col>
            <Col span={7} style={{ textAlign: 'right' }}>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                重置
              </Button>
              <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit">
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  const tabList = [
    {
      tabName: '酒店订单',
      tabKey: 'hotel',
    },
    {
      tabName: '接送车订单',
      tabKey: 'pickup',
    },
  ];

  const changeTab = (key: string) => {
    setOrderType(key);
    setCurrent(1);
  };

  return (
    <div className={styles.checkOrders}>
      {/* <div className={styles.banner}>
        <img src={Title} alt="Title" />
      </div> */}
      <div className={styles.bannerSmall}>
        <img src={backgroundSmall} alt="alt" />
        <img className={styles.title} src={title} alt="alt" />
      </div>
      <div>
        <div className={styles.tabs}>
          {currentUser.name === undefined ? <QueryInput /> : null}
          <Tabs size="large" activeKey={orderType} onTabClick={changeTab}>
            {tabList.map((tabItem: any) => {
              return (
                <TabPane tab={tabItem.tabName} key={tabItem.tabKey}>
                  <Spin spinning={isLoading}>
                    {(orderType === 'hotel' && hotelListData.length === 0) ||
                      (orderType === 'pickup' && rideListData.length === 0) ? (
                        <span className={styles.noData}>暂无数据</span>
                      ) : (
                        <OrderCard />
                      )}
                  </Spin>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default connect(({ user }: { user: any }) => ({ user }))(CheckOrders);
