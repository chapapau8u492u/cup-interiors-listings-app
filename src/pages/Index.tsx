
import React, { useState } from 'react';
import Header from '@/components/Header';
import NavigationIcons from '@/components/NavigationIcons';
import StudioCard, { Studio } from '@/components/StudioCard';
import { useToast } from "@/components/ui/use-toast";

// Sample data for studios
const studioData: Studio[] = [
  {
    id: '1',
    name: 'Epic Designs',
    rating: 4.5,
    projects: 57,
    experience: 8,
    priceLevel: 2,
    description: 'Passionate team of 4 designers working out of Bangalore with an experience of 8 years.',
    contactNumbers: ['+91 - 9845392853', '+91 - 9845392854']
  },
  {
    id: '2',
    name: 'Studio - D3',
    rating: 4.5,
    projects: 43,
    experience: 6,
    priceLevel: 3,
    description: 'Passionate team of 4 designers working out of Bangalore with an experience of 6 years.',
    contactNumbers: ['+91 - 9845392853', '+91 - 9845392854']
  },
  {
    id: '3',
    name: 'House of Designs',
    rating: 5,
    projects: 65,
    experience: 10,
    priceLevel: 3,
    description: 'Top-rated interior design firm specializing in modern and contemporary spaces.',
    contactNumbers: ['+91 - 9847652123', '+91 - 9847652124']
  },
  {
    id: '4',
    name: 'Creative Interiors',
    rating: 4,
    projects: 38,
    experience: 5,
    priceLevel: 2,
    description: 'Specializing in budget-friendly designs without compromising on quality.',
    contactNumbers: ['+91 - 9863451287', '+91 - 9863451288']
  },
  {
    id: '5',
    name: 'Luxe Home Studio',
    rating: 5,
    projects: 72,
    experience: 12,
    priceLevel: 4,
    description: 'Premium designs for luxury homes and commercial spaces.',
    contactNumbers: ['+91 - 9823456789', '+91 - 9823456790']
  }
];

const Index = () => {
  const { toast } = useToast();
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(false);
  
  const handleToggleShortlist = (id: string) => {
    const newShortlistedIds = new Set(shortlistedIds);
    
    if (newShortlistedIds.has(id)) {
      newShortlistedIds.delete(id);
      toast({
        title: "Removed from shortlist",
        description: "Studio has been removed from your shortlist",
      });
    } else {
      newShortlistedIds.add(id);
      toast({
        title: "Added to shortlist",
        description: "Studio has been added to your shortlist",
      });
    }
    
    setShortlistedIds(newShortlistedIds);
  };
  
  const handleToggleFilter = () => {
    setShowOnlyShortlisted(!showOnlyShortlisted);
  };
  
  // Filter studios based on shortlist filter
  const filteredStudios = showOnlyShortlisted
    ? studioData.filter(studio => shortlistedIds.has(studio.id))
    : studioData;

  return (
    <div className="min-h-screen bg-emptyCup-lightBg pb-6">
      <Header 
        onToggleFilter={handleToggleFilter} 
        isFilterActive={showOnlyShortlisted} 
      />
      <NavigationIcons 
        onToggleFilter={handleToggleFilter} 
        isFilterActive={showOnlyShortlisted}
      />
      
      <div className="px-4 py-2">
        {filteredStudios.length === 0 && showOnlyShortlisted ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No studios shortlisted yet.</p>
            <button 
              onClick={handleToggleFilter}
              className="mt-4 text-emptyCup-yellow hover:underline"
            >
              Show all studios
            </button>
          </div>
        ) : (
          filteredStudios.map(studio => (
            <StudioCard 
              key={studio.id}
              studio={studio}
              isShortlisted={shortlistedIds.has(studio.id)}
              onToggleShortlist={handleToggleShortlist}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
