import { useQuery, useMutation } from '@tanstack/react-query';

export function useTeachers() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => ({ teachers: [] }),
  });
}

export function useCreateTeacher() {
  return useMutation({
    mutationFn: async (teacher: unknown) => teacher,
  });
}
