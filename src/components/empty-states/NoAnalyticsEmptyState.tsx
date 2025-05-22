import React from 'react';
import EmptyState from './EmptyState';

interface NoAnalyticsEmptyStateProps {
  onViewClaimsClick?: () => void;
}

export const NoAnalyticsEmptyState: React.FC<NoAnalyticsEmptyStateProps> = ({ onViewClaimsClick }) => {
  return (
    <EmptyState
      icon="analytics"
      title="No Analytics Data Available"
      description="There is no analytics data to display at the moment. Please ensure you have submitted claims and allow some time for processing and analysis."
      buttonText="View My Claims"
      buttonIcon="list_alt"
      onButtonClick={onViewClaimsClick}
      variant="secondary"
    />
  );
};

export default NoAnalyticsEmptyState; 