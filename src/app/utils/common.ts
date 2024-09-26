export const setTitle = (title: string) => {
  document.title = title;
};

export const getMonthInWords = (monthString: string) => {
  const date = new Date(`${monthString}-01`);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};
