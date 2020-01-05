import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const exportedModal = props => {
  const { show, closed } = props;

  return (
    <Modal show={show} onHide={closed}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closed}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default exportedModal;