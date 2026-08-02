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
      bgColor: 'bg-gray-800/80',
      border: 'border-gray-700',
      textColor: 'text-orange-500',
      iconBg: 'bg-orange-500/20',
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: data.sunset,
      bgColor: 'bg-gray-800/80',
      border: 'border-gray-700',
      textColor: 'text-orange-500',
      iconBg: 'bg-orange-500/20',
    },
    {
      icon: Sun,
      label: 'Solar Noon',
      value: data.solar_noon,
      bgColor: 'bg-gray-800/80',
      border: 'border-gray-700',
      textColor: 'text-orange-500',
      iconBg: 'bg-orange-500/20',
    },
    {
      icon: Clock,
      label: 'Day Length',
      value: data.day_length,
      bgColor: 'bg-gray-800/80',
      border: 'border-gray-700',
      textColor: 'text-orange-500',
      iconBg: 'bg-orange-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mainData.map((item) => (
        <Card
          key={item.label}
          className={`overflow-hidden hover:shadow-2xl hover:border-orange-500/50 transition-all ${item.bgColor} backdrop-blur-sm ${item.border}`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className={`text-lg font-medium ${item.textColor}`}>
                {item.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${item.iconBg}`}>
                <item.icon className={`w-5 h-5 ${item.textColor}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
