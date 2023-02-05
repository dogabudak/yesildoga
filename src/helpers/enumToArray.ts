const StringIsNumber = (value) => isNaN(Number(value)) === false;
export const ToArray = (val) => {
  return Object.keys(val)
    .filter(StringIsNumber)
    .map((key) => val[key]);
};
