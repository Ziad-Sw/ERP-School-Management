import { useQuery, useMutation } from '@tanstack/react-query';

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => ({ employees: [] }),
  });
}

export function useCreateEmployee() {
  return useMutation({
    mutationFn: async (employee: unknown) => employee,
  });
}
