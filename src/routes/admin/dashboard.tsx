import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dashboard')({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">어드민 대시보드</h1>
        <p className="mt-4 text-gray-600">로그인이 완료되었습니다.</p>
      </div>
    </div>
  );
}

