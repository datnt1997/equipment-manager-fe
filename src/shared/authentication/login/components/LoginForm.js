import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm(props) {
  const { values, handleChange, handleSubmit, errors, t } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>{t('email')}:</Form.Label>
        <Form.Control
          type="text" placeholder={t('login:email_placeholder')} name='email'
          value={values.email} onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>{t('password')}:</Form.Label>
        <Form.Control
          type="password" placeholder={t('login:password_placeholder')} name='password'
          value={values.password} onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">{t('login:login')}</Button>
    </Form>
  );
}

export default LoginForm;