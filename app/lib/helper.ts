// Helper function to convert entries to markdown

export type Entry = {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string; // Optional since "Present" is possible
  current: boolean;
  description: string;
};

export function entriesToMarkdown(entries: Entry[], type: string) {
  if (!entries?.length) return "";

  return (
    `## ${type}\n\n` +
    entries
      .map((entry) => {
        const dateRange = entry.current
          ? `${entry.startDate} - Present`
          : `${entry.startDate} - ${entry.endDate}`;
        return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
      })
      .join("\n\n")
  );
}
