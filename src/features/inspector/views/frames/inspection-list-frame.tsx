import { InspectionListView } from '../views/inspection-list-view';
import { useGetInspectionTargets } from '../../viewmodels';


export function InspectionListFrame() {
  const { targets, isLoading } = useGetInspectionTargets();

  return <InspectionListView targets={targets} isLoading={isLoading} />;
}
