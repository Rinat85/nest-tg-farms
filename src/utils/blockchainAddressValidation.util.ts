export function isValidEthAddress(coinAddress: string): boolean {
  const addrRegEx = /^0x[a-fA-F0-9]{40}$/g;
  return addrRegEx.test(coinAddress);
}
