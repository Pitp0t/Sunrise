import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MapPin, Navigation } from 'lucide-react';
import type { LocationData } from '../../types/sunrise.types';

interface LocationSelectorProps {
  location: LocationData;
  onLocationChange: (location: LocationData) => void;
}

export const LocationSelector = ({
  location,
  onLocationChange,
}: LocationSelectorProps) => {
  const [lat, setLat] = useState(location.lat.toString());
  const [lng, setLng] = useState(location.lng.toString());
  const [name, setName] = useState(location.name || '');

  const handleApply = () => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      alert('Please enter valid latitude and longitude values');
      return;
    }

    if (latNum < -90 || latNum > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }

    if (lngNum < -180 || lngNum > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }

    onLocationChange({
      lat: latNum,
      lng: lngNum,
      name: name || `${latNum}, ${lngNum}`,
    });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLat(newLat.toString());
          setLng(newLng.toString());
          setName('Your Location');
          onLocationChange({
            lat: newLat,
            lng: newLng,
            name: 'Your Location',
          });
        },
        (error) => {
          alert('Unable to get your location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span className="font-medium">{location.name || 'Custom Location'}</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          type="number"
          step="any"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <Input
          type="number"
          step="any"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div>

      <Input
        type="text"
        placeholder="Location name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex gap-3">
        <Button onClick={handleApply} className="flex-1">
          Apply Location
        </Button>
        <Button
          variant="outline"
          onClick={handleUseCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Use Current
        </Button>
      </div>
    </div>
  );
};
