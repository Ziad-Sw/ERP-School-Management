import { useQuery, useMutation } from '@tanstack/react-query';

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => ({ user: null }),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => credentials,
  });
}
