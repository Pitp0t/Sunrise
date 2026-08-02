import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sunrise, Sunset, Sun, Clock } from 'lucide-react';
import type { SunriseData } from '../../types/sunrise.types';

interface SunriseCardProps {
  data: SunriseData;
}

export const SunriseCard = ({ data }: SunriseCardProps) => {
  const mainData = [
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: data.sunrise,
      gradient: 'from-orange-400 to-pink-500',
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: data.sunset,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sun,
      label: 'Solar Noon',
      value: data.solar_noon,
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Clock,
      label: 'Day Length',
      value: data.day_length,
      gradient: 'from-blue-400 to-cyan-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mainData.map((item) => (
        <Card
          key={item.label}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {item.label}
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient}`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
