export function transformToNumber(value: any, defaultValue = 0) {
  console.log(value);

  const numValue = Number(value);

  return !Number.isNaN(numValue) ? numValue : defaultValue;
}
