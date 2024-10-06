export const setTitle = (title: string) => {
  document.title = title;
};

export const getMonthInWords = (monthString: string) => {
  const date = new Date(`${monthString}-01`);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

export const getDisplayName = (
  user?: {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
  } | null
) => {
  if (!user) {
    return null;
  }
  if (user.firstname && user.lastname) {
    return `${user.firstname} ${user.lastname}`;
  }
  return user.username || user.email || "User";
};
