import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { SunriseData } from '../../types/sunrise.types';
import {
  Moon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  CloudSun,
  Waves,
} from 'lucide-react';

interface MetadataDisplayProps {
  data: SunriseData;
}

export const MetadataDisplay = ({ data }: MetadataDisplayProps) => {
  const sections = [
    {
      title: 'Twilight Times',
      icon: CloudSun,
      items: [
        { label: 'Dawn', value: data.dawn },
        { label: 'Dusk', value: data.dusk },
        { label: 'First Light', value: data.first_light },
        { label: 'Last Light', value: data.last_light },
        { label: 'Nautical Twilight Begin', value: data.nautical_twilight_begin },
        { label: 'Nautical Twilight End', value: data.nautical_twilight_end },
      ],
    },
    {
      title: 'Golden Hours',
      icon: SunriseIcon,
      items: [
        { label: 'Golden Hour', value: data.golden_hour },
      ],
    },
    {
      title: 'Moon Information',
      icon: Moon,
      items: [
        { label: 'Moon Phase', value: data.moon_phase },
        { label: 'Moon Illumination', value: `${data.moon_illumination}%` },
        { label: 'Moonrise', value: data.moonrise },
        { label: 'Moonset', value: data.moonset },
      ],
    },
    {
      title: 'Sun Position',
      icon: SunsetIcon,
      items: [
        { label: 'Sun Altitude', value: `${data.sun_altitude}°` },
        { label: 'Sun Azimuth', value: `${data.sun_azimuth}°` },
      ],
    },
    {
      title: 'Location Info',
      icon: Waves,
      items: [
        { label: 'Timezone', value: data.timezone },
        { label: 'UTC Offset', value: `${data.utc_offset}` },
        { label: 'Date', value: data.date },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-orange-500">
        Detailed Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="hover:shadow-2xl transition-all bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <section.icon className="w-5 h-5 text-orange-500" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
                  >
                    <span className="text-sm text-gray-400">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
