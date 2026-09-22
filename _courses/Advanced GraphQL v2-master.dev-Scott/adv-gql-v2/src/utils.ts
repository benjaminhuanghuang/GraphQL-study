export const formatDate = (
  stamp: number | string | Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
  locale = "en-US",
): string => new Intl.DateTimeFormat(locale, options).format(new Date(stamp));
