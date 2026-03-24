import { useParams } from '@tanstack/react-router';

import { useInspectionChecklistContext } from '../../viewmodels';
import { InspectionScreen } from '../screens';

export function InspectionFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/' });
  const { form, getSectionProgress, isAllChecked, target, isLoading, roomType } =
    useInspectionChecklistContext();

  return (
    <InspectionScreen
      isLoading={isLoading}
      target={target}
      roomType={roomType}
      register={form.register}
      getSectionProgress={getSectionProgress}
      isAllChecked={isAllChecked}
      uuid={uuid}
    />
  );
}
