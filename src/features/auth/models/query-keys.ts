export const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  admin: () => [...authQueryKeys.all, 'admin'] as const,
} as const;
