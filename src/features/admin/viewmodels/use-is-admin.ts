import { useInspectors } from './queries';

export const useIsAdmin = () => {
  // TODO: change to user information API
  const { error } = useInspectors();
  console.log('error', error);
  return error === undefined ? undefined : error === null;
};
