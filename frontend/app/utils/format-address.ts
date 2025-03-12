/**
 * Formats an Ethereum address by displaying the first 6 characters and the last 4 characters, with the middle characters replaced by asterisks.
 *
 * @param address - A valid Ethereum address in the format `0x...`.
 * @returns The formatted Ethereum address.
 * @throws {Error} If the input address is not 42 characters long.
 */
export function formatEthAddress(address: `0x${string}`) {
  if (address.length !== 42) throw new Error('Invalid address passed!');
  return `${address.slice(0, 6)}****${address.slice(-4)}`;
}