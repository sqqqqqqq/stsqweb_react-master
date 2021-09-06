import React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'umi';
import type { ConferenceSystemState } from '../../model';
import HotelList from './components/HotelList';
import LiveInfoList from './components/LiveInfoList';
import TransferInfoList from './components/TransferInfoList';

interface LiveApplicationProps {
  ConferenceSystemModel: ConferenceSystemState;
  dispatch: Dispatch;
  loading: boolean;
}

const LiveApplication: React.FC<LiveApplicationProps> = (LiveApplicationProps) => {
  const { ConferenceSystemModel } = LiveApplicationProps;

  return (
    <>
      {ConferenceSystemModel.HotelStep === 'SelectHotel' ? <HotelList /> : undefined}
      {ConferenceSystemModel.HotelStep === 'SelectedHotel' ? <LiveInfoList /> : undefined}
      {ConferenceSystemModel.HotelStep === 'PickUp' ? <TransferInfoList /> : undefined}
    </>
  );
};
const mapStateToProps = ({
  ConferenceSystemModel,
  loading,
}: {
  ConferenceSystemModel: ConferenceSystemState;
  loading: { models: Record<string, boolean> };
}) => {
  return {
    ConferenceSystemModel,
    loading: loading.models.ConferenceSystemModel,
  };
};

export default connect(mapStateToProps)(LiveApplication);
