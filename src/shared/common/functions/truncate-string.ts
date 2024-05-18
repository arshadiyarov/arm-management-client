export const truncateString = (val: string) => {
  if (val.length > 40) {
    return val.slice(0, 40);
  }

  return val;
};
