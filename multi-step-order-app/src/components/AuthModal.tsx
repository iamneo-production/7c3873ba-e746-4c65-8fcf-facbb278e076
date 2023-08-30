import React from 'react';
import { Modal } from 'react-bootstrap';

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

function AuthModal({ show, onHide, children }: AuthModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-center mb-4">Telecom App</h4>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
