'use client'
import Layout from '@/components/layout';
import { Button } from '@/components/ui/buttons';
import { ChevronLeft, X } from 'lucide-react';
import { formatUnits } from 'viem';
import { useAccount, useBalance, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import Logo from '@/assets/images/logo.png'

export function ConnectWalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button className='w-fit block' key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const { data: balance } = useBalance({
    address: address,
    chainId: baseSepolia.id,
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
    <Layout className='flex items-center justify-center' >
      <section className='w-full py-8 px-8 bg-em-black rounded-[40px] ' >
        <div className="flex items-center justify-between text-white">
          <Button variant={'ghost'} className='px-0' >
            <ChevronLeft className='text-em-secondary-text' />
          </Button>
          <p>Sign in With Ethereum</p>
          <Button variant={'ghost'} className='px-0' >
            <X className='text-em-secondary-text' />
          </Button>
        </div>
        <div className='py-3' >
          <p className='text-em-secondary-text text-center' >Easy Milestones would like you <br /> to connect a wallet</p>
        </div>
        <div className="w-full border border-dotted border-em-secondary-text py-6 rounded-3xl flex items-center justify-center">
          <img src={Logo.src} className='w-16 h-16' alt='logo' />
        </div>
        <Button className='mt-6 w-full' >
          Connect With Metamask
        </Button>
      </section>
    </Layout>
  );
}
