import React from 'react';
import { connect, PlayerState } from 'umi';
import CarouselBanner from './components/CarouselBanner';
import ReplayList from './components/ReplayList';
import Play from './components/Play';

interface PlayItemProps {
  PlayModel: PlayerState;
}

const Home: React.FC<PlayItemProps> = ({ PlayModel }) => {
  return (
    <div>
      {PlayModel.isPlaying ? <Play /> : <CarouselBanner />}
      <ReplayList />
    </div>
  );
};

const mapStateToProps = ({ PlayModel }: { PlayModel: PlayerState }) => {
  return {
    PlayModel,
  };
};
export default connect(mapStateToProps)(Home);
