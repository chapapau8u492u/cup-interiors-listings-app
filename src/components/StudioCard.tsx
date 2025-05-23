
import React from 'react';
import StarRating from './StarRating';
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Updated Studio interface with location and images
export interface Studio {
  id: string;
  name: string;
  rating: number;
  projects: number;
  experience: number;
  priceLevel: number;
  description: string;
  contactNumbers: string[];
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  images?: string[]; // Array of image paths
}

interface StudioCardProps {
  studio: Studio;
  isShortlisted: boolean;
  onToggleShortlist: (id: string) => void;
}

const StudioCard: React.FC<StudioCardProps> = ({ studio, isShortlisted, onToggleShortlist }) => {
  const { toast } = useToast();
  
  const handleCallClick = () => {
    toast({
      title: "Contact",
      description: `Calling ${studio.contactNumbers[0]}`,
    });
  };
  
  return (
    <div className={`studio-card ${isShortlisted ? 'studio-card-shortlisted' : ''}`}>
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">{studio.name}</h2>
          <div className="flex items-center mt-1">
            <StarRating rating={studio.rating} />
            <span className="ml-1 text-sm text-gray-700">{studio.rating}</span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-3">
            <div className="studio-stat">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
              <span className="text-sm">{studio.projects} projects</span>
            </div>
            <div className="studio-stat">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{studio.experience} years</span>
            </div>
            <div className="studio-stat">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">
                {Array(studio.priceLevel).fill('₹').join('')}
                <span className="text-gray-300">
                  {Array(3 - studio.priceLevel).fill('₹').join('')}
                </span>
              </span>
            </div>
          </div>
          
          <p className="mt-2 text-sm text-emptyCup-lightText">{studio.description}</p>
          
          {studio.location && (
            <p className="mt-2 text-sm text-emptyCup-lightText flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {studio.location.address}
            </p>
          )}
          
          {studio.contactNumbers && studio.contactNumbers.length > 0 && (
            <p className="mt-2 text-sm">{studio.contactNumbers[0]}</p>
          )}
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <button 
            onClick={() => onToggleShortlist(studio.id)} 
            className="flex flex-col items-center"
          >
            <Heart className={`w-6 h-6 ${isShortlisted ? 'fill-emptyCup-yellow text-emptyCup-yellow' : 'text-gray-400'}`} />
            <span className="text-xs mt-1">{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
          </button>
          
          <button onClick={handleCallClick} className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-xs mt-1">Call</span>
          </button>
          
          {studio.images && studio.images.length > 0 && (
            <button className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs mt-1">Gallery</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
