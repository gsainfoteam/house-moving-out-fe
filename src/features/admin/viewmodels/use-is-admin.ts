import { useInspectors } from './queries';

export const useIsAdmin = () => {
  // TODO: change to user information API
  const { error } = useInspectors();
  return error === undefined ? undefined : error === null;
};
