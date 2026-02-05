
import React from 'react';

interface ReferenceButtonsProps {
  pngUrl: string;
  htmlUrl?: string;
}

const ReferenceButtons: React.FC<ReferenceButtonsProps> = ({ pngUrl, htmlUrl }) => {
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <a 
        href={pngUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="pointer-events-auto bg-black/80 hover:bg-black text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg transition-all flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-xs">image</span>
        Ver referência (PNG)
      </a>
      {htmlUrl && (
        <a 
          href={htmlUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto bg-primary text-black text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-xs">code</span>
          Ver referência (HTML)
        </a>
      )}
    </div>
  );
};

export default ReferenceButtons;
