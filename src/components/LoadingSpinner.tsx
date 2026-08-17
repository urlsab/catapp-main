import React from 'react';
import logo from '../../Assets/logoiCatapp.png';

const LoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40">
      <span
        className="absolute rounded-full border-8 border-blue-500 border-t-transparent animate-spin"
        style={{
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      ></span>
      <img
        src={logo}
        alt="Logo"
        className="relative z-10 object-contain"
        style={{
          width: '70%',
          height: '70%',
          maxWidth: '140px',
          maxHeight: '140px',
          minWidth: '60px',
          minHeight: '60px',
        }}
      />
    </div>
  </div>
);

export default LoadingSpinner;