import React, { useRef, useEffect } from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center w-full h-full bg-black/40">
      {/*modal*/}
      <div
        ref={modalRef}
        className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-sky-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center z-10"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
