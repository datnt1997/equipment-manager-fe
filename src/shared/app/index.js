import React, { memo } from 'react';
import Container from 'react-bootstrap/Container'
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROUTE_PATH } from '../../constants';
import { PrivateRoute } from './components/PrivateRoute';

import Login from '../authentication/login';
import EquipmentAdmin from '../../modules/equipmentAdmin';
import EquipmentUser from '../../modules/equipmentUser';
import MyEquipments from '../../modules/myEquipments';
import { withLoader } from '../../shared/hocs/withLoader';
import { withModal } from '../../shared/hocs/withModal';

const App = () => {
  return (
    <Container>
      <Switch>
        <Route
          path={ROUTE_PATH.DEFAULT}
          exact
          render={() => {
            const token = localStorage.getItem('token_em');
            if (token) {
              return <Redirect to={ROUTE_PATH.HOME} />;
            }
            return <Redirect to={ROUTE_PATH.LOGIN} />;
          }}
        />
        <Route
          path={ROUTE_PATH.LOGIN}
          exact
          component={Login}
        />
        <PrivateRoute
          requireToken
          path={ROUTE_PATH.EQUIPMENTS_ADMIN}
          component={EquipmentAdmin}
        />
        <PrivateRoute
          requireToken
          path={ROUTE_PATH.EQUIPMENTS_USER}
          component={EquipmentUser}
        />
        <PrivateRoute
          requireToken
          path={ROUTE_PATH.MY_EQUIPMENTS}
          component={MyEquipments}
        />
      </Switch>
    </Container>
  );
}

export default withLoader(withModal(memo(App)));
