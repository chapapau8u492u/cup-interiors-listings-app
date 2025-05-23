
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NavigationIcons from '@/components/NavigationIcons';
import StudioCard, { Studio } from '@/components/StudioCard';
import Gallery from '@/pages/Gallery';
import Location from '@/pages/Location';
import { useToast } from "@/components/ui/use-toast";

// Sample data for studios with location and images
const studioData: Studio[] = [
  {
    id: '1',
    name: 'Epic Designs',
    rating: 4.5,
    projects: 57,
    experience: 8,
    priceLevel: 2,
    description: 'Passionate team of 4 designers working out of Bangalore with an experience of 8 years.',
    contactNumbers: ['+91 - 9845392853', '+91 - 9845392854'],
    location: {
      address: 'MG Road, Bangalore',
      lat: 12.9716,
      lng: 77.5946
    },
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800',
      'https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=800'
    ]
  },
  {
    id: '2',
    name: 'Studio - D3',
    rating: 4.5,
    projects: 43,
    experience: 6,
    priceLevel: 3,
    description: 'Passionate team of 4 designers working out of Bangalore with an experience of 6 years.',
    contactNumbers: ['+91 - 9845392853', '+91 - 9845392854'],
    location: {
      address: 'Indiranagar, Bangalore',
      lat: 12.9784,
      lng: 77.6408
    },
    images: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800'
    ]
  },
  {
    id: '3',
    name: 'House of Designs',
    rating: 5,
    projects: 65,
    experience: 10,
    priceLevel: 3,
    description: 'Top-rated interior design firm specializing in modern and contemporary spaces.',
    contactNumbers: ['+91 - 9847652123', '+91 - 9847652124'],
    location: {
      address: 'Koramangala, Bangalore',
      lat: 12.9352,
      lng: 77.6245
    },
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800',
      'https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800'
    ]
  },
  {
    id: '4',
    name: 'Creative Interiors',
    rating: 4,
    projects: 38,
    experience: 5,
    priceLevel: 2,
    description: 'Specializing in budget-friendly designs without compromising on quality.',
    contactNumbers: ['+91 - 9863451287', '+91 - 9863451288'],
    location: {
      address: 'HSR Layout, Bangalore',
      lat: 12.9116,
      lng: 77.6389
    },
    images: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800',
      'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=800'
    ]
  },
  {
    id: '5',
    name: 'Luxe Home Studio',
    rating: 5,
    projects: 72,
    experience: 12,
    priceLevel: 4,
    description: 'Premium designs for luxury homes and commercial spaces.',
    contactNumbers: ['+91 - 9823456789', '+91 - 9823456790'],
    location: {
      address: 'Whitefield, Bangalore',
      lat: 12.9698,
      lng: 77.7499
    },
    images: [
      'https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=800',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800'
    ]
  }
];

const Index = () => {
  const { toast } = useToast();
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(false);
  const navigate = useNavigate();
  
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

  // Main page component
  const StudioListing = () => {
    // Filter studios based on shortlist filter
    const filteredStudios = showOnlyShortlisted
      ? studioData.filter(studio => shortlistedIds.has(studio.id))
      : studioData;
  
    return (
      <div className="min-h-screen bg-emptyCup-lightBg pb-16">
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
  
  return (
    <Routes>
      <Route path="/" element={<StudioListing />} />
      <Route 
        path="/gallery" 
        element={
          <Gallery 
            studios={studioData}
            shortlistedIds={shortlistedIds}
            showOnlyShortlisted={showOnlyShortlisted}
            handleToggleFilter={handleToggleFilter}
          />
        } 
      />
      <Route 
        path="/location" 
        element={
          <Location 
            studios={studioData}
            shortlistedIds={shortlistedIds}
            showOnlyShortlisted={showOnlyShortlisted}
            handleToggleFilter={handleToggleFilter}
          />
        } 
      />
    </Routes>
  );
};

export default Index;
