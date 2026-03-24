import { useGetInspectionTargets } from '../../viewmodels';
import { InspectionListScreen } from '../screens';


export function InspectionListFrame() {
  const { targets, isLoading } = useGetInspectionTargets();

  return <InspectionListScreen targets={targets} isLoading={isLoading} />;
}
