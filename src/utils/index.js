// Name First Leter Capitalization

export const getNameInitials = (fullName) => {
  const parts = fullName?.trim()?.split(" ");
  if (parts.length >= 2) {
    return parts[0][0]?.toUpperCase() + parts[1][0]?.toUpperCase();
  } else {
    return parts[0][0]?.toUpperCase(); // fallback if single name
  }
};


export const nameRegex = /^[A-Za-z ]+$/;
export const emailRegex =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|net|org|edu|gov|info|co)$/i;
