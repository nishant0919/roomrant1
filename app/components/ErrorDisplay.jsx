import React from 'react';

const ErrorDisplay = ({ message }) => {
  return (
    <div className="flex flex-grow items-center justify-center p-8 text-center text-red-500">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
        <strong className="font-bold">Error!</strong>
        <p className="block sm:inline ml-2">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;