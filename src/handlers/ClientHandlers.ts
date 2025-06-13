export function getDate() {
    // Returns a string representing the date (ie. April 5, 2025)
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date());
}

/**
 * Converts various date input formats into a formatted string like "May 5, 2025".
 * @param input - The date input to format. Can be:
 *   - `number`: Unix timestamp in seconds
 *   - `Date`: a JavaScript Date object
 *   - `string`: in "MM/DD/YYYY" format
 *   - `undefined`: returns "Unknown"
 * @returns A human-readable date string in the format "Month Day, Year" (ie. May 5, 2025) or
 * `"Unknown"` if the input is unknown or invalid
 */
export function formatDate(input: number | Date | string | undefined): string {
  let date: Date | null = null;

  if (input === undefined || input === null) {
    return "Unknown";
  }

  if (typeof input === "number") {
    // Treat as Unix timestamp (in seconds)
    date = new Date(input * 1000);
  } else if (input instanceof Date) {
    date = input;
  } else if (typeof input === "string") {
    // Try MM/DD/YYYY format
    const parts = input.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts.map(part => parseInt(part, 10));
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        date = new Date(year, month - 1, day);
      }
    }

    // If date is still null or invalid, try parsing as ISO format
    if (!date || isNaN(date.getTime())) {
      const isoDate = new Date(input);
      if (!isNaN(isoDate.getTime())) {
        date = isoDate;
      }
    }
  }

  if (!date || isNaN(date.getTime())) {
    return "Unknown";
  }

  // console.log(input);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
