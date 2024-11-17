'use client'
import { formatUnits } from 'viem';
import { useAccount, useBalance, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { sepolia } from 'wagmi/chains';

export function ConnectWalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button className='w-fit block' key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

export function Account() {
  const { address, } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const { data: balance } = useBalance({
    address: address,
    chainId: sepolia.id,
    query: {
      enabled: !!address,
    }
  })


  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      {balance && <div>Chinonso's Sepolia Eth balance is {formatUnits(balance.value, balance.decimals)} {balance.symbol}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}


export default function Home() {
  return (
    <div className='font-Satoshi'>
      <header className="font-Satoshi" >I am the header</header>
      <ConnectWalletOptions />
      <Account />
    </div>
  );
}
