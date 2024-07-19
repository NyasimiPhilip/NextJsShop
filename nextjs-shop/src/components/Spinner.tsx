// components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center h-screen  bg-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
        </div>
      )
    };
export default Spinner;