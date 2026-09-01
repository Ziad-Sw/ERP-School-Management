import { ScheduleGrid } from '@/features/schedule/components/ScheduleGrid';

export function ExamSchedulePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Exam Schedule</h1>
      <p className="text-gray-600">View and manage exam schedule.</p>
      <div className="mt-4">
        <ScheduleGrid />
      </div>
    </div>
  );
}
