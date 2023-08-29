import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Button, Alert } from 'react-bootstrap';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string) => void;
  onClose: () => void;
}

function RegisterForm({ onRegister, onClose }: RegisterFormProps) {
  const handleRegister = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      await onRegister(values.username, values.email, values.password);
      onClose(); // Close the modal on successful registration
    } catch (error) {
      console.error('Error:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={handleRegister}
    >
      {({ isSubmitting, status }) => (
        <Form>
          {status && <Alert variant="danger">{status}</Alert>}
          <Field type="text" name="username" placeholder="Username" />
          <Field type="email" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <Button type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
