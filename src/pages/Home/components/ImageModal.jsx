import React from "react";

const ImageModal = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt="Full size view"
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-scaleIn"
        />
      </div>
    </div>
  );
};

export default ImageModal;
