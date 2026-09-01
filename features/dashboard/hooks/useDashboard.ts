import { useQuery } from '@tanstack/react-query';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => ({ stats: null }),
  });
}
