import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTE_PATH } from '../../../constants';

export const PrivateRoute = ({
  component: Component,
  requireToken,
  ...rest
}) => {
  const token = localStorage.getItem('token_em');
  let isMeet = true;

  if (requireToken) {
    isMeet = !!token;
  }
  return (
    <Route
      {...rest}
      render={props =>
        isMeet ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: ROUTE_PATH.LOGIN }} />
        )
      }
    />
  );
};
