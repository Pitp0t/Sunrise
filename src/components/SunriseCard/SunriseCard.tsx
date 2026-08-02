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
      gradient: 'from-orange-900/40 to-pink-900/40',
      border: 'border-orange-800/50',
      textColor: 'text-orange-400',
      iconBg: 'bg-orange-500/20',
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: data.sunset,
      gradient: 'from-purple-900/40 to-pink-900/40',
      border: 'border-purple-800/50',
      textColor: 'text-purple-400',
      iconBg: 'bg-purple-500/20',
    },
    {
      icon: Sun,
      label: 'Solar Noon',
      value: data.solar_noon,
      gradient: 'from-yellow-900/40 to-orange-900/40',
      border: 'border-yellow-800/50',
      textColor: 'text-yellow-400',
      iconBg: 'bg-yellow-500/20',
    },
    {
      icon: Clock,
      label: 'Day Length',
      value: data.day_length,
      gradient: 'from-blue-900/40 to-cyan-900/40',
      border: 'border-blue-800/50',
      textColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mainData.map((item) => (
        <Card
          key={item.label}
          className={`overflow-hidden hover:shadow-2xl transition-all bg-gradient-to-br ${item.gradient} backdrop-blur-sm ${item.border}`}
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
