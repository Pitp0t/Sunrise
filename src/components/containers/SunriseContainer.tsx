import { useLayout } from '../../hooks/useLayout';
import { SunriseLayout } from '../presentational/SunriseLayout';

export const SunriseContainer = () => {
  const layoutData = useLayout();

  return <SunriseLayout layoutData={layoutData} />;
};
