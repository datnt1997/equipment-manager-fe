import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import LoginForm from './components/LoginForm';
import { validateEmail } from '../../../utils';
import { useEssentials } from '../../hooks/useEssentials';
import { HTTP_METHOD, SERVICE_NAME } from '../../../constants';
import { serviceFactory } from '../../../services/serviceFactory';

const validationSchema = (t) =>
  Yup.object({
    email: Yup.string()
      .test(
        'isValidEmail',
        'Your email is not valid',
        function testValue(value) {
          if (value === undefined) return true;
          return validateEmail(value);
        },
      )
      .required(t('required_field')),
    password: Yup.string().required(t('required_field'))
  });

function Login() {
  const essentials = useEssentials();
  const values = { email: '', password: '' };
  const { t } = useTranslation(['common', 'login']);

  const onSubmit = (values) => {
    const body = { ...values };
    serviceFactory(
      [
        {
          serviceName: SERVICE_NAME.LOGIN,
          method: HTTP_METHOD.POST,
          body,
        },
      ],
      essentials,
    );
  }

  return (
    <Row>
      <Col xs={0} sm={3}></Col>
      <Col xs={12} sm={6}>
        <h1>Equipment Management</h1>
        <Formik
          initialValues={values}
          values={values}
          onSubmit={onSubmit}
          validationSchema={validationSchema(t)}
        >
          {formProps => (
            <LoginForm t={t} {...formProps} />
          )}
        </Formik>
      </Col>
      <Col xs={0} sm={3}></Col>
    </Row>
  );
}

export default Login;