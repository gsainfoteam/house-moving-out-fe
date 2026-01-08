import { Checkbox } from '@/common/components/ui/checkbox';
import { useToken } from '@/features/auth';

// FIXME: 데모

export function MainFrame() {
  const { token } = useToken();
  const isAuthenticated = !!token;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Checkbox />
        <div
          className={`h-2 w-2 rounded-full ${
            isAuthenticated ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
        <span className="text-body">
          {isAuthenticated ? '로그인 중' : '로그인 안 됨'}
        </span>
      </div>
      <div>MainFrame</div>
    </div>
  );
}
