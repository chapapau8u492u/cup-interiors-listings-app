
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationIcons from '@/components/NavigationIcons';
import { Studio } from '@/components/StudioCard';
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface GalleryProps {
  studios: Studio[];
  shortlistedIds: Set<string>;
  showOnlyShortlisted: boolean;
  handleToggleFilter: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ 
  studios, 
  shortlistedIds,
  showOnlyShortlisted,
  handleToggleFilter
}) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  // Filter studios based on shortlist filter
  const filteredStudios = showOnlyShortlisted
    ? studios.filter(studio => shortlistedIds.has(studio.id))
    : studios;

  // Get all images from all studios
  const allImages = filteredStudios.flatMap(studio => 
    (studio.images || []).map(img => ({ 
      studioId: studio.id, 
      studioName: studio.name, 
      url: img 
    }))
  );

  const openModal = (imageUrl: string, studio: Studio) => {
    setSelectedImage(imageUrl);
    setSelectedStudio(studio);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedStudio(null);
  };

  return (
    <div className="min-h-screen bg-emptyCup-lightBg pb-16">
      <Header 
        onToggleFilter={handleToggleFilter} 
        isFilterActive={showOnlyShortlisted} 
      />
      
      <div className="px-4 py-2">
        <h1 className="text-xl font-bold mb-4">Design Gallery</h1>
        
        {allImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No images available.</p>
            {showOnlyShortlisted && (
              <button 
                onClick={handleToggleFilter}
                className="mt-4 text-emptyCup-yellow hover:underline"
              >
                Show all studios
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {allImages.map((image, index) => (
              <div 
                key={`${image.studioId}-${index}`}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                onClick={() => {
                  const studio = studios.find(s => s.id === image.studioId);
                  if (studio) openModal(image.url, studio);
                }}
              >
                <img 
                  src={image.url} 
                  alt={`${image.studioName} project`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Image Modal */}
      {selectedImage && selectedStudio && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <div className="text-white">
              <h3 className="font-bold">{selectedStudio.name}</h3>
            </div>
            <button 
              onClick={closeModal}
              className="text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-grow flex items-center justify-center p-4">
            <img 
              src={selectedImage} 
              alt={`${selectedStudio.name} project`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
      
      <NavigationIcons 
        onToggleFilter={handleToggleFilter} 
        isFilterActive={showOnlyShortlisted}
      />
    </div>
  );
};

export default Gallery;
