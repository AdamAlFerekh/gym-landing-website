export const isValidLebaneseMobile = (value: string): boolean => {
  let number = value.replace(/[\s()-]/g, "");

  if (number.startsWith("00961")) {
    number = "+961" + number.slice(5);
  }

  return /^(?:03\d{6}|(?:70|71|76|78|79|81)\d{6}|\+961(?:3\d{6}|(?:70|71|76|78|79|81)\d{6}))$/.test(
    number,
  );
};
