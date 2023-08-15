export const setIsAllFilled = (
  holderName: string,
  cardNumber: string,
  exYear: string,
  exMonth: string,
  secCode: string
) => {
  const fieldList = [holderName, cardNumber, exYear, exMonth, secCode];
  return fieldList.every((value: string) => value.length > 0);
};
