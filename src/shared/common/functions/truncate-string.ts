export const truncateString = (val: string) => {
  if (val.length > 20) {
    return `${val.slice(0, 20).trim()}...`;
  }

  return val;
};
