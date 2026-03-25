import { useAuth } from '@/features/auth';

import { MypageScreen } from '../screens';

export function MypageFrame() {
  const { user, isInspector, logOut } = useAuth({ showToast: true });

  return (
    <MypageScreen
      isLoading={user === undefined}
      name={user?.name}
      email={user?.email}
      studentNumber={user?.studentNumber}
      gender={user?.gender}
      roomNumber={user?.roomNumber}
      houseName={user?.houseName}
      applyCleaningService={user?.applyCleaningService}
      isInspector={isInspector ?? undefined}
      onLogout={() => logOut({})}
    />
  );
}
