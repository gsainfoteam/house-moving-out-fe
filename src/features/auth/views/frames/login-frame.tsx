import { useSearch } from '@tanstack/react-router';

import { useAuth, useAuthRedirect } from '../../viewmodels';

import { LoginView } from '../views/login-view';

export function LoginFrame() {
  const { idpLogIn } = useAuth();
  const { redirect } = useSearch({ from: '/auth' });

  return (
    <LoginView
      onLogin={() => {
        useAuthRedirect.getState().setRedirect(redirect);
        idpLogIn();
      }}
    />
  );
}
