
import React from 'react';
import { Heart, AlignJustify, MapPin, Image } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationIconsProps {
  onToggleFilter: () => void;
  isFilterActive: boolean;
}

const NavigationIcons: React.FC<NavigationIconsProps> = ({ onToggleFilter, isFilterActive }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around py-2">
        <button 
          className="nav-icon"
          onClick={() => navigate('/')}
        >
          <AlignJustify className="w-6 h-6" />
          <span>All</span>
        </button>
        
        <button 
          className="nav-icon"
          onClick={onToggleFilter}
        >
          <Heart className={isFilterActive ? "w-6 h-6 text-emptyCup-yellow" : "w-6 h-6"} />
          <span>Shortlisted</span>
        </button>
        
        <button 
          className="nav-icon"
          onClick={() => navigate('/gallery')}
        >
          <Image className={location.pathname === '/gallery' ? "w-6 h-6 text-emptyCup-yellow" : "w-6 h-6"} />
          <span>Gallery</span>
        </button>
        
        <button 
          className="nav-icon"
          onClick={() => navigate('/location')}
        >
          <MapPin className={location.pathname === '/location' ? "w-6 h-6 text-emptyCup-yellow" : "w-6 h-6"} />
          <span>Location</span>
        </button>
      </div>
    </div>
  );
};

export default NavigationIcons;
