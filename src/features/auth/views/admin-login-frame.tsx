import { useAdminOAuthLogin } from '../viewmodels';

export function AdminLoginFrame() {
  const { redirectToProvider } = useAdminOAuthLogin();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">퇴사검사 사이트 관리자 페이지</h1>
        <button
          onClick={redirectToProvider}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

