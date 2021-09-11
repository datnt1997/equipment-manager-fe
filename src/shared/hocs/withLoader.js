import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

import { useEssentials } from '../hooks/useEssentials';

export const withLoader = WrappedComponent => () => {
  const { loadingState: { loading } = {} } = useEssentials();

  return (
    <>
      <WrappedComponent />
      {/* <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div> */}
    </>
  );
};
