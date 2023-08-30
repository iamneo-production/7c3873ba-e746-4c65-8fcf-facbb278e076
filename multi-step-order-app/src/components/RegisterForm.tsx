import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Button, Alert } from 'react-bootstrap';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onRegister: (email: string, password: string) => void;
  onClose: () => void;
  onSwitch: () => void;
}

function RegisterForm({ onRegister, onClose, onSwitch }: RegisterFormProps) {
  const handleRegister = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      if (values.password !== values.confirmPassword) {
        actions.setStatus('Passwords do not match');
        return;
      }

      await onRegister(values.email, values.password);
      onClose(); 
    } catch (error) {
      console.error('Error:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      onSubmit={handleRegister}
    >
      {({ isSubmitting, status }) => (
        <Form className="p-3">
          {status && <Alert variant="danger">{status}</Alert>}
          <Field type="email" name="email" placeholder="Email" className="form-control mb-3" />
          <Field type="password" name="password" placeholder="Password" className="form-control mb-3" />
          <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="form-control mb-3" />
          <Button type="submit" disabled={isSubmitting} variant="primary" className="w-100 mb-3">
            Register
          </Button>
          <p className="text-center">
            Already have an account?{' '}
            <button type="button" className="btn btn-link" onClick={onSwitch}>
              Login
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
