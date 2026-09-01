import { useQuery, useMutation } from '@tanstack/react-query';

export function useExams() {
  return useQuery({
    queryKey: ['exams'],
    queryFn: async () => ({ exams: [] }),
  });
}

export function useCreateExam() {
  return useMutation({
    mutationFn: async (exam: unknown) => exam,
  });
}
