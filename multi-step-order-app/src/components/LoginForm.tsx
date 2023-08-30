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
  onSwitch: () => void;
}

function LoginForm({ onLogin, onClose, onSwitch }: LoginFormProps) {
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
        <Form className="p-3">
          {status && <Alert variant="danger">{status}</Alert>}
          <Field type="email" name="email" placeholder="Email" className="form-control mb-3" />
          <Field type="password" name="password" placeholder="Password" className="form-control mb-3" />
          <Button type="submit" disabled={isSubmitting} variant="primary" className="w-100 mb-3">
            Login
          </Button>
          <p className="text-center">
            Don't have an account?{' '}
            <button type="button" className="btn btn-link" onClick={onSwitch}>
              Register
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
