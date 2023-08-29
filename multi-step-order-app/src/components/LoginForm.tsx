import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Button, Alert } from 'react-bootstrap';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
}

function LoginForm({ onLogin, onClose }: LoginFormProps) {
  const handleLogin = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await onLogin(values.email, values.password);
      onClose(); 
    } catch (error) {
      console.error('Error:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleLogin}>
      {({ isSubmitting, status }) => (
        <Form>
          {status && <Alert variant="danger">{status}</Alert>}
          <Field type="email" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
