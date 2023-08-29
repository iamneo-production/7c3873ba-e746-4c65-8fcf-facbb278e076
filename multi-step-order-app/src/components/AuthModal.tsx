import React from 'react';
import { Modal } from 'react-bootstrap';

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

function AuthModal({ show, onHide, children }: AuthModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default AuthModal;
