import React from "react";
import { Modal, Box } from "@mui/material";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById("modal-root");

const ModalWrapper = ({ open, onClose, children }: Props) => {
  if (!open) return null; // Не рендерим, если `open` === false

  return modalRoot
    ? createPortal(
        <Modal open={open} onClose={onClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {children}
          </Box>
        </Modal>,
        modalRoot
      )
    : null;
};

export default ModalWrapper;
