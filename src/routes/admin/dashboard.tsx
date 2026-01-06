import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dashboard')({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-slate-600">
                  퇴사검사 사이트 관리자 페이지
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/25">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 shadow-sm">
          <div className="flex h-64 items-center justify-center">
            <p className="text-slate-400">콘텐츠 영역</p>
          </div>
        </div>
      </div>
    </div>
  );
}

