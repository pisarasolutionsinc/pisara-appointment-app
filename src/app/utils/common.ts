import { PLACEHOLDERS } from "../config/placeholderImg";

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

export const getUserInitials = (
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

  // Function to get initials from a string
  const getInitialsFromString = (str: string) => {
    const words = str.split(" ");
    if (words.length > 1) {
      // If the string has spaces, take the first letter of each word
      return words
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }
    // Otherwise, return the first two letters
    return str.substring(0, 2).toUpperCase();
  };

  // Check for firstname and lastname
  if (user.firstname && user.lastname) {
    return `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}`;
  }

  // Check for username
  if (user.username) {
    return getInitialsFromString(user.username);
  }

  // Check for email (use the part before @)
  if (user.email) {
    const emailPrefix = user.email.split("@")[0];
    return getInitialsFromString(emailPrefix);
  }

  return "NA"; // Default initials if nothing is provided
};

export const getLatestImageUrl = (attachments: string[]) => {
  const imageUrls = attachments.filter((url) =>
    url.match(/\.(jpeg|jpg|gif|png|bmp|svg)$/i)
  );

  return imageUrls.length > 0
    ? imageUrls[imageUrls.length - 1]
    : PLACEHOLDERS.GYM;
};

export const getAllImagesUrl = (attachments: string[]) => {
  const imageUrls = attachments.filter((url) =>
    url.match(/\.(jpeg|jpg|gif|png|bmp|svg)$/i)
  );

  return imageUrls.length > 0
    ? imageUrls
    : [
        PLACEHOLDERS.GYM,
        PLACEHOLDERS.IMG_1,
        PLACEHOLDERS.IMG_2,
        PLACEHOLDERS.IMG_3,
        PLACEHOLDERS.IMG_4,
        PLACEHOLDERS.IMG_5,
      ];
};

export const extractPublicId = (url: string) => {
  const regex = /\/([^\/]+)\.jpg$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
