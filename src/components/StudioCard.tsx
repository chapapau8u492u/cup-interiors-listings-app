
import React from 'react';
import StarRating from './StarRating';
import { useToast } from "@/components/ui/use-toast";

export interface Studio {
  id: string;
  name: string;
  rating: number;
  projects: number;
  experience: number;
  priceLevel: number;
  description: string;
  contactNumbers: string[];
}

interface StudioCardProps {
  studio: Studio;
  isShortlisted: boolean;
  onToggleShortlist: (id: string) => void;
}

const StudioCard: React.FC<StudioCardProps> = ({ 
  studio, 
  isShortlisted,
  onToggleShortlist 
}) => {
  const { toast } = useToast();
  
  const handleHideClick = () => {
    toast({
      title: "Hide",
      description: "Studio hidden from view",
    });
  };
  
  const handleDetailsClick = () => {
    toast({
      title: "Details",
      description: `More details about ${studio.name} coming soon!`,
    });
  };

  // Convert price level to dollar signs
  const priceDisplay = Array(studio.priceLevel).fill('$').join('');

  return (
    <div className={`studio-card ${isShortlisted ? 'studio-card-shortlisted' : ''}`}>
      <div className="flex justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">{studio.name}</h2>
          <div className="flex items-center mb-2">
            <StarRating rating={studio.rating} />
            <span className="text-xs text-gray-500 ml-1">({studio.rating}/5)</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{studio.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="studio-stat">
              <span className="font-bold text-lg">{studio.projects}</span>
              <span className="text-xs text-gray-500">Projects</span>
            </div>
            <div className="studio-stat">
              <span className="font-bold text-lg">{studio.experience}</span>
              <span className="text-xs text-gray-500">Years</span>
            </div>
            <div className="studio-stat">
              <span className="font-bold text-lg">{priceDisplay}</span>
              <span className="text-xs text-gray-500">Price</span>
            </div>
          </div>
          
          {studio.contactNumbers.map((number, index) => (
            <p key={index} className="text-sm">{number}</p>
          ))}
        </div>
        
        <div className="flex flex-col justify-between items-center ml-4 gap-3">
          <button 
            onClick={() => onToggleShortlist(studio.id)}
            className="p-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill={isShortlisted ? "currentColor" : "none"} 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`w-6 h-6 ${isShortlisted ? 'text-emptyCup-yellow' : 'text-gray-500'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
          
          <button 
            onClick={handleDetailsClick}
            className="p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <button 
            onClick={handleHideClick}
            className="p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
