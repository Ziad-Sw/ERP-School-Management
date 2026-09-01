import { useQuery, useMutation } from '@tanstack/react-query';

export function useSchedule() {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: async () => ({ schedule: [] }),
  });
}

export function useUpdateSchedule() {
  return useMutation({
    mutationFn: async (schedule: unknown) => schedule,
  });
}
