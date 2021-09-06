import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import type { ParticipantType } from '../../../../data';
import styles from './index.less';

interface ParticipantCardListProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  participantList: ParticipantType[];
  changeModelData: (value: string[]) => void;
  disabled: boolean;
}

const ParticipantCardList: React.FC<ParticipantCardListProps> = (ParticipantCardListProps) => {
  const { value, participantList, onChange, changeModelData, disabled } = ParticipantCardListProps;

  // 当前房间的邀请码列表
  const [invitationCodeList, setInvitationCodeList] = useState<string[]>([]);
  useEffect(() => {
    if (value) {
      setInvitationCodeList(value);
    }
  }, []);

  const btnClick = (item: ParticipantType) => {
    if (item.isSelected && invitationCodeList.indexOf(item.invitationCode) === -1) {
      // 该参会人已选择其他房间
      message.info('不可重复选择入住人');
    } else if (invitationCodeList.indexOf(item.invitationCode) === -1) {
      // 该参会人未选择其他房间
      if (invitationCodeList.length === 2) {
        message.info('每个房间不超过两人');
      } else {
        setInvitationCodeList([...invitationCodeList, item.invitationCode]);
        onChange?.([...invitationCodeList, item.invitationCode]);
        changeModelData([item.invitationCode]);
      }
    } else {
      // 该参会人已选择该房间
      const newInvitationCodeList = invitationCodeList.concat();
      const index = newInvitationCodeList.indexOf(item.invitationCode);
      newInvitationCodeList.splice(index, 1);
      setInvitationCodeList(newInvitationCodeList);
      onChange?.(newInvitationCodeList);
      changeModelData([item.invitationCode]);
    }
  };

  return (
    <Card bordered={false}>
      {participantList.map((item: ParticipantType) => {
        return item.isLive === '1' ? (
          <Card.Grid
            key={item.invitationCode}
            hoverable
            className={`${styles.participantCard} ${
              value && value?.indexOf(item.invitationCode) !== -1 ? styles.selected : ''
            }`}
          >
            <a
              className={styles.participantCardItem}
              onClick={() => {
                if (!disabled) {
                  btnClick(item);
                }
              }}
            >
              <p>姓名：{item.name}</p>
              <p>联系方式：{item.contactInformation}</p>
              <p>联系邮箱：{item.email}</p>
              <p>邀请码：{item.invitationCode}</p>
              <CheckCircleTwoTone className={styles.logo} />
            </a>
          </Card.Grid>
        ) : (
          ''
        );
      })}
    </Card>
  );
};

export default ParticipantCardList;
