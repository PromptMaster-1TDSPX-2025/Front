import { useState } from 'react';
import type { ItemFaq } from '../types/faq';

export function QuestaoFaq({ question, answer }: ItemFaq) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-green-400' : 'text-white group-hover:text-green-400'}`}>
          {question}
        </span>
        
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-400' : 'text-gray-400'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>     

      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}