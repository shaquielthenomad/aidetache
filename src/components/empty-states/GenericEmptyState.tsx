import React from 'react';
import EmptyState from './EmptyState';

interface GenericEmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: string;
  onButtonClick?: () => void;
  onBackClick?: () => void;
}

export const GenericEmptyState: React.FC<GenericEmptyStateProps> = ({
  icon = 'info_outline',
  title = 'Nothing to See Here Yet',
  description = 'This section is currently empty. Check back later or try adding some data to populate it.',
  buttonText = 'Go to Dashboard',
  buttonIcon = 'arrow_back',
  onButtonClick,
  onBackClick
}) => {
  return (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
      buttonText={buttonText}
      buttonIcon={buttonIcon}
      onButtonClick={onButtonClick || onBackClick}
      variant="primary"
    />
  );
};

export default GenericEmptyState; 