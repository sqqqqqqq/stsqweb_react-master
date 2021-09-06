import React from 'react';

export default (props: { title: string; color?: string }) => {
  const { title, color = '#fff' } = props;

  const h1Style: any = {
    fontSize: '20px',
    lineHeight: '100px',
    fontWeight: 'bold',
    textAlign: 'center',
    color,
  };

  return (
    <h1 style={h1Style} className="big-data-com-header">
      {title}
    </h1>
  );
};
