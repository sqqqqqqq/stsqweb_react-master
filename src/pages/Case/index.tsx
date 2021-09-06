import React, { useEffect, useState } from 'react';
import TabsCard from './components/TabsCard';
import { HotCase } from './components/HotCase';
import CaseDetails from './components/CaseDetails';
import styles from './index.less';

const Case: React.FC = (props: any) => {
  const [isDetails, setIsDetails] = useState(false);
  const [isIndustryId, setIsIndustryId] = useState<string>('');

  const { industryId } = props.location.query;

  useEffect(() => {
    if (industryId) {
      setIsDetails(true);
      setIsIndustryId(industryId);
    } else {
      setIsDetails(false);
    }

    window.scrollTo(0, 0);
  }, [industryId]);

  return (
    <div>
      {isDetails ? (
        <CaseDetails isDetailsIndustry={isIndustryId} />
      ) : (
        <div>
          <div className={styles.bgImg} />
          <HotCase />
          <TabsCard />
        </div>
      )}
    </div>
  );
};

export default Case;
