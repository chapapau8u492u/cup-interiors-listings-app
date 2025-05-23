
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationIcons from '@/components/NavigationIcons';
import { Studio } from '@/components/StudioCard';
import MapComponent from '@/components/MapComponent';
import { useToast } from "@/components/ui/use-toast";
import { MapPin, List } from "lucide-react";

interface LocationProps {
  studios: Studio[];
  shortlistedIds: Set<string>;
  showOnlyShortlisted: boolean;
  handleToggleFilter: () => void;
}

const Location: React.FC<LocationProps> = ({ 
  studios, 
  shortlistedIds,
  showOnlyShortlisted,
  handleToggleFilter
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  // Filter studios based on shortlist filter
  const filteredStudios = showOnlyShortlisted
    ? studios.filter(studio => shortlistedIds.has(studio.id))
    : studios;

  // Filter studios with location data
  const studiosWithLocation = filteredStudios.filter(studio => studio.location);

  const handleStudioSelect = (studio: Studio) => {
    setSelectedStudio(studio);
    toast({
      title: studio.name,
      description: `Selected ${studio.name}`,
    });
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'map' ? 'list' : 'map');
  };

  return (
    <div className="min-h-screen bg-emptyCup-lightBg pb-16">
      <Header 
        onToggleFilter={handleToggleFilter} 
        isFilterActive={showOnlyShortlisted} 
      />
      
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Studio Locations</h1>
          <button 
            onClick={toggleViewMode}
            className="flex items-center space-x-1 bg-emptyCup-cardBg px-3 py-1 rounded-md"
          >
            {viewMode === 'map' ? (
              <>
                <List className="w-4 h-4" />
                <span className="text-sm">List</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Map</span>
              </>
            )}
          </button>
        </div>
        
        {studiosWithLocation.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No studios with location data available.</p>
            {showOnlyShortlisted && (
              <button 
                onClick={handleToggleFilter}
                className="mt-4 text-emptyCup-yellow hover:underline"
              >
                Show all studios
              </button>
            )}
          </div>
        ) : viewMode === 'map' ? (
          <div className="h-[70vh] w-full">
            <MapComponent 
              studios={studiosWithLocation} 
              onStudioSelect={handleStudioSelect}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {studiosWithLocation.map(studio => (
              <div 
                key={studio.id}
                className="studio-card flex items-center"
                onClick={() => handleStudioSelect(studio)}
              >
                <div className="mr-3">
                  <MapPin className="w-5 h-5 text-emptyCup-yellow" />
                </div>
                <div>
                  <h3 className="font-medium">{studio.name}</h3>
                  {studio.location && (
                    <p className="text-sm text-gray-600">{studio.location.address}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <NavigationIcons 
        onToggleFilter={handleToggleFilter} 
        isFilterActive={showOnlyShortlisted}
      />
    </div>
  );
};

export default Location;
