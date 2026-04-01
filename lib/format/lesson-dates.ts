const formatter = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'medium',
  timeStyle: 'short'
});

export function formatLessonDateTime(iso: Date): string {
  return formatter.format(iso);
}
