
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Studio } from './StudioCard';
import { useToast } from "@/components/ui/use-toast";

interface MapComponentProps {
  studios: Studio[];
  onStudioSelect?: (studio: Studio) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ studios, onStudioSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapKey, setMapKey] = useState<string>('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, allow user to input a Mapbox token
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapKey(storedToken);
    }
  }, []);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapbox_token') as string;
    
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapKey(token);
      toast({
        title: "Success",
        description: "Mapbox token saved. Initializing map...",
      });
    }
  };

  useEffect(() => {
    if (!mapKey || !mapContainer.current) return;

    try {
      // Initialize map only once
      if (map.current) return;

      setLoading(true);
      mapboxgl.accessToken = mapKey;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [78.9629, 20.5937], // Center on India
        zoom: 4
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add studio markers when map loads
      map.current.on('load', () => {
        setLoading(false);
        
        // Add markers for each studio with location data
        studios.forEach(studio => {
          if (studio.location) {
            const { lat, lng } = studio.location;
            
            // Create marker element
            const el = document.createElement('div');
            el.className = 'studio-marker';
            el.style.width = '25px';
            el.style.height = '25px';
            el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
            el.style.backgroundSize = 'cover';
            el.style.cursor = 'pointer';
            
            // Add popup
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <strong>${studio.name}</strong>
                <p>${studio.rating} ★</p>
                <p>${studio.location.address}</p>
              `);
            
            // Add marker to map
            new mapboxgl.Marker(el)
              .setLngLat([lng, lat])
              .setPopup(popup)
              .addTo(map.current!);
              
            // Add click event to marker
            el.addEventListener('click', () => {
              if (onStudioSelect) {
                onStudioSelect(studio);
              }
            });
          }
        });
      });
      
      // Handle error
      map.current.on('error', () => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load the map. Please check your Mapbox token.",
          variant: "destructive"
        });
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to initialize map. Please try again.",
        variant: "destructive"
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapKey, studios, onStudioSelect, toast]);

  return (
    <div className="w-full h-full">
      {!mapKey ? (
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Mapbox API Key Required</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please enter your Mapbox public token to view the map. You can get one by signing up at 
            <a href="https://www.mapbox.com/" 
               className="text-blue-500 ml-1"
               target="_blank" 
               rel="noopener noreferrer">
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-3">
            <div>
              <label htmlFor="mapbox_token" className="block text-sm font-medium text-gray-700">
                Mapbox Public Token
              </label>
              <input 
                type="text"
                id="mapbox_token"
                name="mapbox_token"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="pk.eyJ1Ijoie3lvdXItdXNlcm5hbWV9IiwiYSI..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emptyCup-yellow hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              Save Token & Load Map
            </button>
          </form>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="w-full h-full rounded-lg" />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emptyCup-yellow border-t-transparent"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapComponent;
