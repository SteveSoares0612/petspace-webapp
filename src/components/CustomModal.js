import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({
  show,
  title,
  message,
  onClose,
  onConfirm,
  confirmText,
  showConfirm,
  showCancel,
  cancelText,
  variant,
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
       
        {showCancel ? (
          <>
             <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
          </>
        ) : (
          <></>
        )}
        {showConfirm ? (
          <>
            <Button variant={variant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
