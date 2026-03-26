import { useRouter } from '@tanstack/react-router';

import { useAuth } from '@/features/auth';

import { MypageScreen } from '../screens';

export function MypageFrame() {
  const { user, isInspector, logOut } = useAuth({ showToast: true });
  const router = useRouter();

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
      onBack={() => router.history.back()}
      onLogout={() => logOut({})}
    />
  );
}
