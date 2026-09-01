import { useQuery, useMutation } from '@tanstack/react-query';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => ({ profile: null }),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (profile: unknown) => profile,
  });
}
