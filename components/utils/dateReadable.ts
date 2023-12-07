// utils/dateUtils.ts
export const formatHumanReadableDate = (isoDate: string): string => {
    const eventDate = new Date(isoDate);
    const month = eventDate.toLocaleString("en-US", { month: "long" });
    const day = eventDate.toLocaleString("en-US", { day: "numeric" });
    const year = eventDate.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  