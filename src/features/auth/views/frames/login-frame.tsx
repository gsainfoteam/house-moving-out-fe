import { useSearch } from '@tanstack/react-router';

import { useAuth, useAuthRedirect } from '../../viewmodels';
import { LoginScreen } from '../screens';

export function LoginFrame() {
  const { idpLogIn } = useAuth();
  const { redirect } = useSearch({ from: '/auth' });

  return (
    <LoginScreen
      onLogin={() => {
        useAuthRedirect.getState().setRedirect(redirect);
        idpLogIn();
      }}
    />
  );
}
