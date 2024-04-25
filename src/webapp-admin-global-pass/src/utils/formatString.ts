/* eslint-disable prefer-regex-literals */
export const splitAndGetFirst = (str: string, separador: string) =>
  str.slice(0, str.indexOf(separador));

export const splitAndSliceByIndex = (
  str: string,
  separador: string,
  sliceIndex: number
) => {
  const strSplitted = str.split(separador);
  return strSplitted.slice(sliceIndex);
};

export const getInitialsName = (name: string) => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  const initials = [...name.matchAll(rgx)] || [];

  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();
};
