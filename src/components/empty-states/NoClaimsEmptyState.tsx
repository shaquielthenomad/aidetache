import React from 'react';
import EmptyState from './EmptyState';

interface NoClaimsEmptyStateProps {
  onUploadClick?: () => void;
}

export const NoClaimsEmptyState: React.FC<NoClaimsEmptyStateProps> = ({ onUploadClick }) => {
  return (
    <EmptyState
      icon="cloud_upload"
      title="No Claims Submitted Yet"
      description="You haven't submitted any claims yet. Upload a claim to get started and see your dashboard populate with data."
      buttonText="Upload Claim"
      buttonIcon="add_circle_outline"
      onButtonClick={onUploadClick}
      variant="primary"
    />
  );
};

export default NoClaimsEmptyState; 