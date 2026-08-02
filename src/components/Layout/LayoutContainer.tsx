import { useLayout } from '../../hooks/useLayout';
import { LayoutPresentational } from './LayoutPresentational';

export const LayoutContainer = () => {
  const layoutData = useLayout();

  return <LayoutPresentational {...layoutData} />;
};
