import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  className = "",
}) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current!;
    if (open && modal) {
      modal.showModal();
    }

    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`bg-amber-200 rounded-lg shadow-lg border-none p-4 w-90 modal ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!,
  );
};

export default Modal;
