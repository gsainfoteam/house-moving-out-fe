import { createFileRoute } from '@tanstack/react-router';

import { RoomListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/rooms')({
  component: RoomListFrame,
});
