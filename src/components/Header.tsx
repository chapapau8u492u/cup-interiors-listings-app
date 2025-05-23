
import React from 'react';
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  onToggleFilter: () => void;
  isFilterActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleFilter, isFilterActive }) => {
  const { toast } = useToast();
  
  const handleMenuClick = () => {
    toast({
      title: "Menu",
      description: "Menu functionality coming soon!",
    });
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
      <div className="flex items-center">
        <div className="border-2 border-emptyCup-yellow px-2 py-1">
          <h1 className="font-bold text-lg">EmptyCup</h1>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={handleMenuClick}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
