import { parseAbiItem, PublicClient } from 'viem';
import easyMilestonesAbi from './abi';

export async function getPastPayments(publicClient: PublicClient, contractAddress: `0x${string}`, fromBlock: bigint = 0n) {
  // use event filters here to filter by address, 
  const logs = await publicClient.getLogs({
    address: contractAddress,
    event: parseAbiItem('event FundsTransferred(address indexed owner, uint256 amount, string milestone_title, uint256 timestamp)'),
    fromBlock,
    toBlock: 'latest',
  });
  
  const payments = logs.map(log => ({
    owner: log.args.owner,
    amount: log.args.amount?.toString(),
    milestoneTitle: log.args.milestone_title,
    timestamp: log.args.timestamp?.toString(),
    txHash: log.transactionHash,
    blockNumber: Number(log.blockNumber),
    logIndex: Number(log.logIndex)
  }));
  
  return payments;
}

export const wagmiContractConfig = {
  address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi: easyMilestonesAbi
}