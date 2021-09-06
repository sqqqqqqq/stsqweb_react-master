import React from 'react';
import type { CurrentUser } from '@/models/user';
import { connect } from 'react-redux';
import WishOrder from '@/components/WishOrder';

interface OrderProps {
  match: {
    params: {
      id: string;
    };
  };
  location: {
    query: {
      id: string;
      industry: string;
      type: string;
      name: string;
    };
  };
  currentUser: CurrentUser;
}

const Order = (props: OrderProps) => {
  const {
    match: {
      params: { id: orderId },
    },
    location: {
      query: { id: mecId, industry: mecIndustry, type: mecProductType, name: mecName },
    },
    currentUser,
  } = props;

  let mecParams;

  if (mecId && mecIndustry && mecProductType && mecName) {
    mecParams = {
      mecId,
      mecIndustry,
      mecProductType,
      mecName,
    };
  }

  return <WishOrder orderId={orderId} mecParams={mecParams} user={currentUser} />;
};

export default connect(({ user }: any) => ({ currentUser: user.currentUser }))(Order);
