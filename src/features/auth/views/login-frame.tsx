import { useOAuthLogin } from '../viewmodels';

import { Button } from '@/common/components';

export function LoginFrame() {
  const { redirectToProvider } = useOAuthLogin();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>하우스 퇴사 검사</h1>
      <p>하우스 퇴사 검사 통합 시스템</p>
      <Button className="mt-4" onClick={redirectToProvider}>
        인포팀 계정으로 로그인
      </Button>
    </div>
  );
}
