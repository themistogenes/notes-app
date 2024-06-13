import React from 'react';

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        Click the 'Add' button to make your first note.
      </p>
    </div>
  )
}

export default EmptyCard