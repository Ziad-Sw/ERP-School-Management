import { useQuery, useMutation } from '@tanstack/react-query';

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => ({ students: [] }),
  });
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: async (student: unknown) => student,
  });
}
