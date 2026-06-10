const StringIsNumber = (value: string) => isNaN(Number(value)) === false;
export const ToArray = (val: Record<string, string>) => {
  return Object.keys(val)
    .filter(StringIsNumber)
    .map((key) => val[key]);
};
