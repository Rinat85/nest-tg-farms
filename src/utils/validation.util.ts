const commandSetRegExp = /[^a-zA-Z0-9]+/gm;
const addrRegEx = /^0x[a-fA-F0-9]{40}$/g;
export const commandRegExp = /^[\/][a-zA-Z0-9]+/gm;

export function isValidEthAddress(coinAddress: string): boolean {
  return addrRegEx.test(coinAddress);
}

export function isCommandSet(commandString: string): boolean {
  return !commandSetRegExp.test(commandString);
}

export function isCommand(command: string): boolean {
  return commandRegExp.test(command);
}
