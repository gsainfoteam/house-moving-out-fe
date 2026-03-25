import { useParams } from '@tanstack/react-router';

import { NoShowStatus, useInspectionChecklistContext, useRecordNoShow } from '../../viewmodels';
import { InspectionScreen } from '../screens';

export function InspectionFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/' });
  const { form, getSectionProgress, isAllChecked, isNoneChecked, target, isLoading, roomType } =
    useInspectionChecklistContext();
  const { recordNoShow } = useRecordNoShow();

  return (
    <InspectionScreen
      isLoading={isLoading}
      target={target}
      roomType={roomType}
      register={form.register}
      getSectionProgress={getSectionProgress}
      isAllChecked={isAllChecked}
      isNoneChecked={isNoneChecked}
      onNoShowRequest={async () => {
        const result = await recordNoShow(uuid, NoShowStatus.PENDING_NO_SHOW);
        return result?.targetPhoneNumber;
      }}
      onNoShowConfirm={async () => void (await recordNoShow(uuid, NoShowStatus.NO_SHOW))}
      uuid={uuid}
    />
  );
}
