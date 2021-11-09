import React, { PropsWithChildren } from 'react';

const mockLink = {
  __esModule: true,
  default: ({ children }: PropsWithChildren<any>): React.ReactNode => (
    <>{children}</>
  ),
};

export default mockLink;
