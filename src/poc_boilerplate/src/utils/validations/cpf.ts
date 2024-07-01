export const validCpf = (cpf: string) => {
  if (typeof cpf !== 'string') return false;
  const cpfReceived = cpf.replace(/[^\d]+/g, '');
  if (cpfReceived.length !== 11 || !!cpfReceived.match(/(\d)\1{10}/))
    return false;
  const cpfReceivedSplitted = cpfReceived.split('');
  const validator = cpfReceivedSplitted
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map(el => +el);
  const toValidate = (pop: number) =>
    cpfReceivedSplitted
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map(el => +el);
  const rest = (count: number, pop: number) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
};
